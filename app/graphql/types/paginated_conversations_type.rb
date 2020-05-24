module Types
  class PaginatedConversationsType < Types::PaginatedResultsType
    collection_type(Types::ConversationType)
  end
end