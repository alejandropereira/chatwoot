# frozen_string_literal: true

class ConversationsCountComponent < ViewComponent::Base
  renders_many :links, -> (name:, assignee_type:, active:, count:) do
    TabItemComponent.new(name: name, assignee_type: assignee_type, active: active, count: count)
  end
end
