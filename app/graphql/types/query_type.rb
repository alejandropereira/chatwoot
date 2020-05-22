module Types
  class QueryType < Types::BaseObject
    field :web_widget, resolver: Queries::WebWidget
  end
end
