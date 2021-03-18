class Admin::ConversationsController < Admin::BaseController
  def index
    @conversations = Conversation.open.latest.assigned_to(current_admin).includes(:messages, :contact)
    unless current_tenant.web_widgets.any?(&:persisted?)
      @widget = current_account.web_widgets.build
      @widget.build_inbox(account_id: current_account.id)
    end
  end

  def show
    @conversations = Conversation.open.latest.assigned_to(current_admin).includes(:messages, :contact)
    @conversation = Conversation.find(params[:id])
    @messages = @conversation.messages
  end
end
