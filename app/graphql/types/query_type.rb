module Types
  class QueryType < Types::BaseObject
    field :web_widget, resolver: Queries::WebWidget
    field :agents, resolver: Queries::Agents
    field :conversations, resolver: Queries::Conversations
  end
end
