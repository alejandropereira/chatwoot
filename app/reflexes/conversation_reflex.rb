class ConversationReflex < ApplicationReflex
    def assign
        conversation = Conversation.find(element.dataset.conversation_id)
        assignee = User.find_by(id: element.value)
        conversation.update_assignee(assignee)
        content = assignee.nil? ? "Conversation unassigned successfully." : assignee == current_user ? "Conversation assigned to you successfully." : "Conversation assigned to #{assignee.name} successfully."
        cable_ready.inner_html(
          selector: "#flash-messages",
          html: render(partial: "admin/shared/flash_message", locals: { content: content })
      ).broadcast
    end
end