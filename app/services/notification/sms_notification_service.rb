class Notification::SmsNotificationService
    pattr_initialize [:notification!]
  
    def perform
      # don't send emails if user read the push notification already
      return if notification.read_at.present?
      return unless user_subscribed_to_notification?
      return unless account.phone_number.present? || account.account_sid.present? || account.auth_token.present?
  
      client.messages.create(message_params(notification.primary_actor, notification.user))
    end
  
    private

    def message_params(conversation, agent)
      {
        body: "#{agent.name}, A new conversation [ID - #{conversation.display_id}] has been created in #{conversation.inbox&.name}.",
        from: account.phone_number,
        to: agent.phone_number
      }
    end

    def account
      @account ||= notification.account
    end

    def client
      ::Twilio::REST::Client.new(account.account_sid, account.auth_token)
    end
  
    def user_subscribed_to_notification?
      notification_setting = notification.user.notification_settings.find_by(account_id: account.id)
      return true if notification_setting.public_send("sms_#{notification.notification_type}?")
  
      false
    end
  end 
  