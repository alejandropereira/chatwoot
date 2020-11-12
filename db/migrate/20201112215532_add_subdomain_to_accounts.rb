class AddSubdomainToAccounts < ActiveRecord::Migration[6.0]
  def change
    add_column :accounts, :subdomain, :string
    add_index :accounts, :subdomain, unique: true
    add_index :accounts, :name, unique: true
  end
end
