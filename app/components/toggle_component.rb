# frozen_string_literal: true

class ToggleComponent < ViewComponent::Base
  def initialize(enabled:, title:)
    @enabled = enabled
    @title = title
  end
end
