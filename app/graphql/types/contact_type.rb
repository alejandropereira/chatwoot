module Types
  class ContactType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: true
    field :phone_number, String, null: true
  end
end