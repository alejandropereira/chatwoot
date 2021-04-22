# == Schema Information
#
# Table name: accounts
#
#  id                 :integer          not null, primary key
#  card_exp_month     :string
#  card_exp_year      :string
#  card_last4         :string
#  card_type          :string
#  domain             :string(100)
#  extra_billing_info :text
#  feature_flags      :integer          default(0), not null
#  locale             :integer          default("en")
#  name               :string           not null
#  processor          :string
#  settings_flags     :integer          default(0), not null
#  subdomain          :string
#  support_email      :string(100)
#  trial_ends_at      :datetime
#  twilio_settings    :jsonb            not null
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  processor_id       :string
#
# Indexes
#
#  index_accounts_on_name       (name) UNIQUE
#  index_accounts_on_subdomain  (subdomain) UNIQUE
#

class Account < ApplicationRecord
  include Pay::Billable
  # used for single column multi flags
  extend FriendlyId
  include FlagShihTzu

  include Events::Types
  include Reportable
  include Featurable

  DEFAULT_QUERY_SETTING = {
    flag_query_mode: :bit_operator
  }.freeze

  ACCOUNT_SETTINGS_FLAGS = {
    1 => :custom_email_domain_enabled
  }.freeze

  validates :name, presence: true

  has_many :account_users, dependent: :destroy
  has_many :agent_bot_inboxes, dependent: :destroy
  has_many :users, through: :account_users
  has_many :inboxes, dependent: :destroy
  has_many :conversations, dependent: :destroy
  has_many :messages, dependent: :destroy
  has_many :contacts, dependent: :destroy
  has_many :facebook_pages, dependent: :destroy, class_name: '::Channel::FacebookPage'
  has_many :telegram_bots, dependent: :destroy
  has_many :twilio_sms, dependent: :destroy, class_name: '::Channel::TwilioSms'
  has_many :twitter_profiles, dependent: :destroy, class_name: '::Channel::TwitterProfile'
  has_many :web_widgets, dependent: :destroy, class_name: '::Channel::WebWidget'
  has_many :email_channels, dependent: :destroy, class_name: '::Channel::Email'
  has_many :api_channels, dependent: :destroy, class_name: '::Channel::Api'
  has_many :canned_responses, dependent: :destroy
  has_many :webhooks, dependent: :destroy
  has_many :labels, dependent: :destroy
  has_many :notification_settings, dependent: :destroy
  has_many :hooks, dependent: :destroy, class_name: 'Integrations::Hook'
  has_flags ACCOUNT_SETTINGS_FLAGS.merge(column: 'settings_flags').merge(DEFAULT_QUERY_SETTING)

  enum locale: LANGUAGES_CONFIG.map { |key, val| [val[:iso_639_1_code], key] }.to_h

  validates :name, uniqueness: true
  validates :subdomain, uniqueness: true

  after_create :notify_creation
  after_commit :setup_and_subscribe_stripe_subscription, on: :create
  after_destroy :notify_deletion

  store :twilio_settings, accessors: [:account_sid, :auth_token, :phone_number]

  friendly_id :name, use: :slugged, slug_column: :subdomain

  def agents
    @agents ||= users.where(account_users: { role: :agent })
  end

  def administrators
    @administrators ||= users.where(account_users: { role: :administrator })
  end

  def first_name
    administrators.first.first_name
  end

  def last_name
    administrators.first.last_name
  end

  def email
    administrators.first.email
  end

  def all_conversation_tags
    # returns array of tags
    conversation_ids = conversations.pluck(:id)
    ActsAsTaggableOn::Tagging.includes(:tag)
                             .where(context: 'labels',
                                    taggable_type: 'Conversation',
                                    taggable_id: conversation_ids)
                             .map { |_| _.tag.name }
  end

  def webhook_data
    {
      id: id,
      name: name
    }
  end

  private

  def setup_and_subscribe_stripe_subscription
    return if Rails.env.test?
    
    self.processor = 'stripe'
    subscribe(name: ENV['FREE_PLAN_NAME'], plan: ENV['FREE_PLAN_ID']) if ENV['FREE_PLAN_ID'].present?
  end

  def notify_creation
    Rails.configuration.dispatcher.dispatch(ACCOUNT_CREATED, Time.zone.now, account: self)
  end

  def notify_deletion
    Rails.configuration.dispatcher.dispatch(ACCOUNT_DESTROYED, Time.zone.now, account: self)
  end
end
