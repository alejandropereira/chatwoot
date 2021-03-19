class Admin::ConversationsController < Admin::BaseController
  before_action :set_conversations, only: [:index, :show] 

  def index
    unless current_tenant.web_widgets.any?(&:persisted?)
      @widget = current_account.web_widgets.build
      @widget.build_inbox(account_id: current_account.id)
    end
  end

  def show
    @conversation = Conversation.find(params[:id])
    @messages = @conversation.messages
  end

  private

  def set_conversations
    params[:assignee_type] ||= "me"
    result = conversation_finder.perform
    @conversations = result[:conversations]
    @conversations_count = result[:count]
  end

  def conversation_finder
    @conversation_finder ||= ConversationFinder.new(current_user, params)
  end
end
