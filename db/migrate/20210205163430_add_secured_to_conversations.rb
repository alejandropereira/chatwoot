class AddSecuredToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :secured, :boolean, default: false
  end
end
