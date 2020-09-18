class Types::QueryType < Types::BaseObject
  field :web_widget, resolver: Queries::WebWidget
  field :agents, resolver: Queries::Agents
  field :conversations, resolver: Queries::Conversations
  field :messages, resolver: Queries::Messages
  field :message, Types::MessageType, null: false do
    argument :id, ID, required: true
  end

  def message(id:)
    Message.find(id)
  end
end
