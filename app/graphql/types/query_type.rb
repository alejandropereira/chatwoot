module Types
  class QueryType < Types::BaseObject
    field :web_widget, resolver: Queries::WebWidget
    field :agents, resolver: Queries::Agents
  end
end
