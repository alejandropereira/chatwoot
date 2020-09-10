class Mutations::CreateMessage < Mutations::BaseMutation
  argument :website_token, String, required: true
  argument :uuid, String, required: true
  argument :token, String, required: true
  argument :content, String, required: false
  argument :referer_url, String, required: false
  argument :timestamp, String, required: false
  argument :attachment, Types::FileType, required: false

  field :message, Types::MessageType, null: true

  def resolve(website_token:, uuid:, content: nil, **options)
    @uuid = uuid
    set_web_widget(website_token)
    set_token(options[:token])
    set_contact
    set_conversation({ referer_url: options[:referer_url], timestamp: options[:timestamp] })
    @message = conversation.messages.new(message_params(content))
    @message.save
    build_attachment(options[:attachment])

    {
      message: @message
    }
  end

  private

  def build_attachment(uploaded_attachment)
    return if uploaded_attachment.blank?

    attachment = @message.attachments.new(
      account_id: @message.account_id,
      file_type: file_type(uploaded_attachment&.content_type)
    )
    attachment.file.attach(uploaded_attachment)
    @message.save!
  end

  def file_type(content_type)
    return :image if [
      'image/jpeg',
      'image/png',
      'image/svg+xml',
      'image/gif',
      'image/tiff',
      'image/bmp'
    ].include?(content_type)

    :file
  end

  def message_params(content)
    {
      account_id: @conversation.account_id,
      sender: @contact,
      content: content,
      inbox_id: @conversation.inbox_id,
      message_type: :incoming
    }
  end

  def conversation
    @conversation ||= @contact_inbox.conversations.find_by(
      inbox_id: @auth_token_params[:inbox_id],
      uuid: @uuid
    )
  end

  def set_conversation(params)
    @conversation = ::Conversation.create!(conversation_params(params)) if conversation.nil? || @uuid == 'volatile'
  end

  def conversation_params(params)
    {
      account_id: inbox.account_id,
      inbox_id: inbox.id,
      contact_id: @contact.id,
      contact_inbox_id: @contact_inbox.id,
      additional_attributes: {
        browser: browser_params,
        referer: params[:referer_url],
        initiated_at: {
          timestamp: params[:timestamp]
        }
      }
    }
  end

  def browser_params
    {
      browser_name: browser.name,
      browser_version: browser.full_version,
      device_name: browser.device.name,
      platform_name: browser.platform.name,
      platform_version: browser.platform.version
    }
  end

  def browser
    @browser ||= context[:browser]
  end

  def inbox
    @inbox ||= ::Inbox.find_by(id: @auth_token_params[:inbox_id])
  end

  def set_web_widget(website_token)
    @web_widget = ::Channel::WebWidget.find_by!(website_token: website_token)
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

    @contact_inbox = ::ContactInbox.find_by(
      inbox_id: @web_widget.inbox.id,
      source_id: @auth_token_params[:source_id]
    )

    @contact = @contact_inbox ? @contact_inbox.contact : nil
  end
end
