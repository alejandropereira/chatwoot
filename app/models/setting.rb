# == Schema Information
#
# Table name: settings
#
#  id              :bigint           not null, primary key
#  google_calendar :jsonb            not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  account_id      :bigint
#  user_id         :bigint
#
# Indexes
#
#  index_settings_on_account_id       (account_id)
#  index_settings_on_google_calendar  (google_calendar)
#  index_settings_on_user_id          (user_id)
#
class Setting < ApplicationRecord
  acts_as_tenant(:account)
  belongs_to :user

  store :google_calendar, accessors: [:access_token, :id, :name], coder: JSON, prefix: true
end
