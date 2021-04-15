class CalendarEvent < ApplicationRecord
  acts_as_tenant(:account)

  validates :title, presence: true
end
