class TagReflex < ApplicationReflex
    def add
        conversation = Conversation.find(element.dataset.conversation_id)
        labels = conversation.label_list + [element.dataset.tag]
        conversation.update_labels(labels)

        morph "#add-tags", render(partial: "admin/conversations/add_tags_form", locals: { tags: conversation.labels, conversation_id: conversation.id, current_account: current_account })
        morph "#tags", render(partial: "admin/conversations/tags", locals: { tags: conversation.labels })
    end

    def create
        label = current_account.labels.new(label_params)

        if label.save
            cable_ready.insert_adjacent_html(
                selector: "#labels",
                html: render(partial: "admin/conversations/tag", locals: { item: label, plus: true, conversation_id: element.dataset.conversation_id, current_account: current_account })
            ).inner_html(
                selector: "#new-label",
                html: render(partial: "admin/conversations/create_label", locals: { label: current_account.labels.new, conversation_id: element.dataset.conversation_id })
            ).broadcast
        else
            cable_ready.inner_html(
                selector: "#new-label",
                html: render(partial: "admin/conversations/create_label", locals: { label: label, conversation_id: element.dataset.conversation_id })
            ).broadcast
        end

        morph :nothing
    end

    def remove
        conversation = Conversation.find(element.dataset.conversation_id)
        labels = conversation.label_list - [element.dataset.tag]
        conversation.update_labels(labels)
        morph "#add-tags", render(partial: "admin/conversations/add_tags_form", locals: { tags: conversation.labels, conversation_id: conversation.id, current_account: current_account })
        morph "#tags", render(partial: "admin/conversations/tags", locals: { tags: conversation.labels })
    end

    private
    
    def label_params
        params.require(:label).permit(:title)
    end
end