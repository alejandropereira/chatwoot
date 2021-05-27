# == Schema Information
#
# Table name: account_users
#
#  id         :bigint           not null, primary key
#  active_at  :datetime
#  role       :integer          default("agent")
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint
#  inviter_id :bigint
#  user_id    :bigint
#
# Indexes
#
#  index_account_users_on_account_id  (account_id)
#  index_account_users_on_user_id     (user_id)
#  uniq_user_id_per_account_id        (account_id,user_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#  fk_rails_...  (user_id => users.id)
#

class AccountUser < ApplicationRecord
  include Events::Types

  acts_as_tenant(:account)
  belongs_to :user
  belongs_to :inviter, class_name: "User", optional: true
  has_many :event_invitees, as: :invitee
  has_many :events, through: :event_invitees, class_name: "CalendarEvent"

  delegate :first_name, :name, :avatar_url, to: :user
  delegate :last_name, to: :user
  delegate :email, to: :user

  enum role: { agent: 0, administrator: 1 }
  accepts_nested_attributes_for :account

  after_create :notify_creation, :create_notification_setting
  after_destroy :notify_deletion, :destroy_notification_setting

  validates :user_id, uniqueness: { scope: :account_id }

  def create_notification_setting
    setting = user.notification_settings.new(account_id: account.id)
    setting.selected_email_flags = [:email_conversation_assignment]
    setting.selected_push_flags = [:push_conversation_assignment]
    setting.save!
  end

  def destroy_notification_setting
    setting = user.notification_settings.find_by(account_id: account.id)
    setting.destroy!
  end

  def settings
    user.settings.find_by(account_id: account.id)
  end

  private

  def notify_creation
    Rails.configuration.dispatcher.dispatch(AGENT_ADDED, Time.zone.now, account: account)
  end

  def notify_deletion
    Rails.configuration.dispatcher.dispatch(AGENT_REMOVED, Time.zone.now, account: account)
  end
end
