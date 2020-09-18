class Types::PaginationType < Types::BaseObject
  field :current_page, Int, null: true
  field :next_page, Int, null: true
  field :prev_page, Int, null: true
  field :total_pages, Int, null: true
  field :total_count, Int, null: true
end
