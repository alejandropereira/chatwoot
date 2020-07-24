module Types
  class MessageType < Types::BaseObject
    field :id, ID, null: false
    field :content, String, null: true
    field :content_type, String, null: true
    field :message_type, String, null: true
    field :status, String, null: true
    field :assignee, Types::UserType, null: true
    field :attachments, [Types::AttachmentType], null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: true

    def assignee
      object.user
    end
  end
end