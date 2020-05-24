module Types
  class WebWidgetType < Types::BaseObject
    field :id, ID, null: false
    field :welcome_title, String, null: true
    field :welcome_tagline, String, null: true
    field :agents, [Types::AgentType], null: true

    def welcome_title
      object.welcome_title.present? ? object.welcome_title : I18n.t("messages.welcome_title")
    end

    def welcome_tagline
      object.welcome_tagline.present? ? object.welcome_tagline : I18n.t("messages.welcome_tagline")
    end

    def agents
      object.inbox.inbox_members.includes(user: :avatar_attachment)
    end
  end
end