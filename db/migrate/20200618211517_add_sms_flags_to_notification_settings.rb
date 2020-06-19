class AddSmsFlagsToNotificationSettings < ActiveRecord::Migration[6.0]
  def change
    add_column :notification_settings, :sms_flags, :integer, default: 0, null: false
  end
end
