module Types
  class PaginatedMessagesType < Types::PaginatedResultsType
    collection_type(Types::MessageType)
  end
end