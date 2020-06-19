class Notification::SmsNotificationJob < ApplicationJob
    queue_as :default
  
    def perform(notification)
      Notification::SmsNotificationService.new(notification: notification).perform
    end
  end
  