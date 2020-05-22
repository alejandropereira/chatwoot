module Queries
  class Agents < Queries::BaseQuery
    description "Get agents for web widget by web_token"

    argument :website_token, String, required: true

    type [Types::AgentType], null: false

    def resolve(website_token:)
      set_web_widget(website_token)
      @web_widget.inbox.inbox_members.includes(:user)
    end

    private

    def set_web_widget
      @web_widget = ::Channel::WebWidget.find_by!(website_token: permitted_params[:website_token])
      @account = @web_widget.account
      switch_locale @account
    end

    def switch_locale(account)
      I18n.locale = (I18n.available_locales.map(&:to_s).include?(account.locale) ? account.locale : nil) || I18n.default_locale
    end
  end
end