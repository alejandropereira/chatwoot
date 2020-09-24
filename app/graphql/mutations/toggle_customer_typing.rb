class Mutations::ToggleCustomerTyping < Mutations::BaseMutation
  include Events::Types
  
  argument :website_token, String, required: true
  argument :token, String, required: true
  argument :typing_status, String, required: true
  argument :uuid, String, required: true

  field :typing, Boolean, null: false

  def resolve(website_token:, token:, typing_status:, uuid:)
    @uuid = uuid
    typing = typing_status == 'on'
    set_web_widget(website_token)
    set_token(token)
    set_contact
    return unless conversation

    if typing
      trigger_typing_event(CONVERSATION_TYPING_ON)
    else
      trigger_typing_event(CONVERSATION_TYPING_OFF)
    end

    {
      typing: typing
    }
  end
  
  private

  def trigger_typing_event(event)
    Rails.configuration.dispatcher.dispatch(event, Time.zone.now, conversation: conversation, user: @contact)
  end

  def conversation
    @conversation ||= @contact_inbox.conversations.find_by(
      inbox_id: @auth_token_params[:inbox_id],
      uuid: @uuid
    )
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
    @contact_inbox = @web_widget.inbox.contact_inboxes.find_by(
      source_id: @auth_token_params[:source_id]
    )
    @contact = @contact_inbox.contact
  end

  def set_web_widget(website_token)
    @web_widget = ::Channel::WebWidget.find_by!(website_token: website_token)
  end
end
