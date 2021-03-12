class Admin::ConversationsController < Admin::BaseController
  def index
    @conversations = Conversation.open.latest.assigned_to(current_admin).includes(:messages, :contact)
    account = Account.last
    @widget = account.web_widgets.build
    @widget.build_inbox(account_id: account.id)
  end

  def show
    @conversations = Conversation.open.latest.assigned_to(current_admin).includes(:messages, :contact)
    @conversation = Conversation.find(params[:id])
    @messages = @conversation.messages
  end
end
