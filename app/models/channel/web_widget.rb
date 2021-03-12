# == Schema Information
#
# Table name: channel_web_widgets
#
#  id              :integer          not null, primary key
#  feature_flags   :integer          default(3), not null
#  website_token   :string
#  website_url     :string
#  welcome_tagline :string
#  welcome_title   :string
#  widget_color    :string           default("#1f93ff")
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :integer
#
# Indexes
#
#  index_channel_web_widgets_on_website_token  (website_token) UNIQUE
#

class Channel::WebWidget < ApplicationRecord
  include FlagShihTzu

  self.table_name = 'channel_web_widgets'

  validates :website_url, presence: true
  validates :widget_color, presence: true

  belongs_to :account
  has_one :inbox, as: :channel, dependent: :destroy
  has_secure_token :website_token
  has_flags 1 => :attachments,
            2 => :emoji_picker,
            :column => 'feature_flags'

  accepts_nested_attributes_for :inbox

  def has_24_hour_messaging_window?
    false
  end

  def web_widget_script
    "<script>
      (function(d,t) {
        var BASE_URL = \"#{ENV.fetch('FRONTEND_URL', '')}\";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src= BASE_URL + \"/packs/js/sdk.js\";
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          window.chatwootSDK.run({
            websiteToken: '#{website_token}',
            baseUrl: BASE_URL
          })
        }
      })(document,\"script\");
    </script>"
  end

  def web_widget_script_v2
    "<script>
      (function(d,t) {
        var BASE_URL = \"#{ENV.fetch('FRONTEND_URL', '')}\";
        var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src= BASE_URL + \"/packs/js/novachat.js\";
        s.parentNode.insertBefore(g,s);
        g.onload=function(){
          const messenger = new window.NovachatMessenger({
            websiteToken: '#{website_token}',
            baseUrl: BASE_URL
          })
          messenger.render()
        }
      })(document,\"script\");
    </script>"
  end

  def create_contact_inbox
    ActiveRecord::Base.transaction do
      contact = inbox.account.contacts.create!(name: ::Haikunator.haikunate(1000))
      contact_inbox = ::ContactInbox.create!(
        contact_id: contact.id,
        inbox_id: inbox.id,
        source_id: SecureRandom.uuid
      )
      contact_inbox
    rescue StandardError => e
      Rails.logger.info e
    end
  end
end
