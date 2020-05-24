module Types
  class MessageType < Types::BaseObject
    field :id, ID, null: false
    field :content, String, null: true
    field :message_type, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true
  end
end