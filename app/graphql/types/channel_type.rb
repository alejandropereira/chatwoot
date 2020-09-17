class Types::ChannelType < Types::BaseObject
  field :id, ID, null: false
  field :name, String, null: true
  field :avatar_url, String, null: true
end
