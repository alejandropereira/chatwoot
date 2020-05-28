module Types
  class ConversationType < Types::BaseObject
    field :id, ID, null: false
    field :uuid, ID, null: false
    field :assignee, Types::UserType, null: true
    field :messages, Types::PaginatedMessagesType, null: true do
      argument :page, Integer, required: false, default_value: 1
      argument :per, Integer, required: false, default_value: 20
      argument :sorting, Types::SortingInput, required: false
    end

    def messages(page:, per:, sorting:)
      @collection = object.messages
      @collection = @collection.reorder("#{sorting.field} #{sorting.order}") if sorting.present?
      @collection = @collection
                      .page(page)
                      .per(per)
    end
  end
end