class Admin::ConversationsController < Admin::BaseController
  def index
    @conversations = Conversation.open.latest.assigned_to(current_user).includes(:messages)
  end
end
