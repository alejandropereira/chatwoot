class ConversationsReflex < ApplicationReflex
    def filter
        connection.current_account
        session[:assignee_type] = element.dataset.assignee_type
        set_conversations
        cable_ready[UserChannel].outer_html(
            selector: "#conversations-sidebar",
            html: render(partial: "admin/conversations/sidebar", locals: { conversations: @conversations, conversations_count: @conversations_count, assignee_type: session[:assignee_type] })
        ).broadcast_to(connection.current_user)
        morph :nothing
    end

    private

  def set_conversations
    Current.account = connection.current_account
    result = conversation_finder.perform
    @conversations = result[:conversations]
    @conversations_count = result[:count]
  end

  def conversation_finder
    @conversation_finder ||= ConversationFinder.new(connection.current_user, assignee_type: session[:assignee_type])
  end
end