module Queries
  class Contact < Queries::BaseQuery
    description "Get contact for web widget by web_token"

    argument :website_token, String, required: true
    argument :token, String, required: true

    type Types::ContactType, null: false

    def resolve(website_token:, token:)
      set_web_widget(website_token)
      set_token(token)
      set_contact
    end

    private

    def set_web_widget(website_token)
      @web_widget = ::Channel::WebWidget.find_by!(website_token: website_token)
      @account = @web_widget.account
      switch_locale @account
    end

    def set_token(token)
      @token = token
      @auth_token_params = if @token.present?
                             ::Widget::TokenService.new(token: @token).decode_token
                           else
                             {}
                           end
    end

    def set_contact
      return if @auth_token_params[:source_id].nil?
  
      contact_inbox = ::ContactInbox.find_by(
        inbox_id: @web_widget.inbox.id,
        source_id: @auth_token_params[:source_id]
      )
  
      @contact = contact_inbox ? contact_inbox.contact : nil
    end

    def switch_locale(account)
      I18n.locale = (I18n.available_locales.map(&:to_s).include?(account.locale) ? account.locale : nil) || I18n.default_locale
    end
  end
end