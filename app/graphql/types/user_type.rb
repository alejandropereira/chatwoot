module Types
  class UserType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: true
    field :avatar_url, String, null: true
    field :availability_status, String, null: true
  end
end