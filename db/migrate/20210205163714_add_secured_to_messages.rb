class AddSecuredToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :secured, :boolean, default: false
  end
end
