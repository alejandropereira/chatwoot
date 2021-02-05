class CreateVerificationPins < ActiveRecord::Migration[6.0]
  def change
    create_table :verification_pins do |t|
      t.string :code
      t.references :verificable, polymorphic: true, null: false

      t.timestamps
    end
  end
end
