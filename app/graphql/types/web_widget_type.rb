class Types::WebWidgetType < Types::BaseObject
  field :id, ID, null: false
  field :welcome_title, String, null: true
  field :welcome_tagline, String, null: true
  field :agents, [Types::AgentType], null: true
  field :channel, Types::ChannelType, null: true

  def welcome_title
    object.welcome_title.presence || I18n.t('messages.welcome_title')
  end

  def welcome_tagline
    object.welcome_tagline.presence || I18n.t('messages.welcome_tagline')
  end

  def agents
    object.inbox.inbox_members.includes(user: :avatar_attachment)
  end

  def channel
    object.inbox
  end
end
