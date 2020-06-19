class AddTwilioSettingsToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :twilio_settings, :jsonb, null: false, default: '{}'
  end
end
