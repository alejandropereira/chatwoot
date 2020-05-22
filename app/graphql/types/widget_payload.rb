module Types
  class WidgetPayload < Types::BaseObject
    field :widget, Types::WebWidgetType, null: false
    field :token, String, null: false
  end
end