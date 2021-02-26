class Admin::ConversationsController < Admin::BaseController
  def index
    @conversations = Conversation.open.latest.assigned_to(current_user).includes(:messages, :contact)
  end

  def show
    @conversations = Conversation.open.latest.assigned_to(current_user).includes(:messages, :contact)
    @conversation = Conversation.find(params[:id])
    @messages = @conversation.messages
  end
end
