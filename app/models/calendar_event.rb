# == Schema Information
#
# Table name: calendar_events
#
#  id         :bigint           not null, primary key
#  end_time   :datetime
#  start_time :datetime
#  title      :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  account_id :bigint           not null
#
# Indexes
#
#  index_calendar_events_on_account_id  (account_id)
#
# Foreign Keys
#
#  fk_rails_...  (account_id => accounts.id)
#
class CalendarEvent < ApplicationRecord
  acts_as_tenant(:account)

  has_many :event_invitees, as: :invitee
  has_many :invitees, through: :event_invitees, class_name: "CalendarEvent"

  validates :title, presence: true
end
