class CreateEventInvitees < ActiveRecord::Migration[6.0]
  def change
    create_table :event_invitees do |t|
      t.belongs_to :calendar_event, null: false, foreign_key: true
      t.belongs_to :invitee, polymorphic: true, null: false

      t.timestamps
    end
  end
end
