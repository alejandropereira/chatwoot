class CreateSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :settings do |t|
      t.belongs_to :user
      t.belongs_to :account
      t.jsonb :google_calendar, null: false, default: {}, index: :gin

      t.timestamps
    end
  end
end
