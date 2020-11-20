module V2
  class WidgetTestsController < ActionController::Base
    before_action :set_web_widget

    def index
      render
    end

    private

    def set_web_widget
      account = Account.friendly.find(request.subdomain)
      @web_widget = account.web_widgets.first
    end
  end
end
