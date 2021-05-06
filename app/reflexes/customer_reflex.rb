class CustomerReflex < ApplicationReflex
  def update
    contact = Contact.find(params[:id])
    contact.update(customer_params)
    cable_ready.inner_html(
      selector: "#flash-messages",
      html: render(partial: "admin/shared/flash_message", locals: { content: "Customer updated successfully." }),
    ).broadcast
  end

  private

  def customer_params
    params.require(:contact).permit(:name, :email, :phone_number)
  end
end
