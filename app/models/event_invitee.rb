# == Schema Information
#
# Table name: event_invitees
#
#  id                :bigint           not null, primary key
#  invitee_type      :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  calendar_event_id :bigint           not null
#  invitee_id        :bigint           not null
#
# Indexes
#
#  index_event_invitees_on_calendar_event_id            (calendar_event_id)
#  index_event_invitees_on_invitee_type_and_invitee_id  (invitee_type,invitee_id)
#
# Foreign Keys
#
#  fk_rails_...  (calendar_event_id => calendar_events.id)
#
class EventInvitee < ApplicationRecord
  belongs_to :calendar_event
  belongs_to :invitee, polymorphic: true
end
