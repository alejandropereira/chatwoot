class SidebarReflex < ApplicationReflex
  before_reflex do
    Current.account = current_account
  end

  def update
    session[:assignee_type] ||= "me"
    result = conversation_finder.perform
    conversations = result[:conversations]
    conversations_count = result[:count]

    cable_ready
      .morph(
        selector: "#conversations-sidebar",
        html: render(partial: "admin/conversations/sidebar", locals: {
                       conversations: conversations,
                       conversations_count: conversations_count,
                       assignee_type: session[:assignee_type],
                     }),
      ).broadcast

    morph :nothing
  end

  private

  def conversation_finder
    @conversation_finder ||= ConversationFinder.new(current_user, { assignee_type: session[:assignee_type] })
  end
end
