module Types
  class QueryType < Types::BaseObject
    field :web_widget, resolver: Queries::WebWidget
    field :agents, resolver: Queries::Agents
    field :conversations, resolver: Queries::Conversations
    field :messages, resolver: Queries::Messages
  end
end
