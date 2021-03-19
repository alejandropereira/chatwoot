# frozen_string_literal: true

class TabItemComponent < ViewComponent::Base
  attr_reader :name, :active, :assignee_type, :count

  def initialize(name:, active:, assignee_type:, count:)
    @name = name
    @active = active
    @assignee_type = assignee_type
    @count = count
  end
end
