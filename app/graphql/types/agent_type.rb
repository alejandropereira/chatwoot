module Types
  class AgentType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :avatar_url, String, null: true
    field :availability_status, String, null: true
  end
end