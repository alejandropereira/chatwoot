class AddGoogleEventIdToEventInvitees < ActiveRecord::Migration[6.0]
  def change
    add_column :event_invitees, :google_event_id, :string
  end
end
