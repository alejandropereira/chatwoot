module Types
  class WidgetPayload < Types::BaseObject
    field :widget, Types::WebWidget, null: false
    field :token, String, null: false
  end
end