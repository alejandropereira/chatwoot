class ConversationReflex < ApplicationReflex
    def assign
        conversation = Conversation.find(element.dataset.conversation_id)
        assignee = User.find_by(id: element.value)
        conversation.update_assignee(assignee)
        set_conversations
        cable_ready[UserChannel].outer_html(
            selector: "#conversations-sidebar",
            html: render(partial: "admin/conversations/sidebar", locals: { conversations: @conversations, conversations_count: @conversations_count, assignee_type: session[:assignee_type] })
        ).broadcast_to(connection.current_user)
        morph :nothing
    end


  def set_conversations
    result = conversation_finder.perform
    @conversations = result[:conversations]
    @conversations_count = result[:count]
  end

  def conversation_finder
    @conversation_finder ||= ConversationFinder.new(connection.current_user, assignee_type: session[:assignee_type])
  end
end