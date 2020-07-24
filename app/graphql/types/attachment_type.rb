module Types
    class AttachmentType < Types::BaseObject
      field :id, ID, null: false
      field :data_url, String, null: true
      field :file_type, String, null: true
      field :thumb_url, String, null: true
      field :created_at, GraphQL::Types::ISO8601DateTime, null: true
    end
  end