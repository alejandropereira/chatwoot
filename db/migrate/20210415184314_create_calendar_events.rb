class CreateCalendarEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :calendar_events do |t|
      t.string :title
      t.datetime :start_time
      t.datetime :end_time
      t.references :account, null: false, foreign_key: true

      t.timestamps
    end
  end
end
