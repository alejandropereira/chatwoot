class ContactPreview < ActionMailer::Preview
  def send_pinn
    contact = Contact.last
    pin = contact.verification_pins.create!
    ContactMailer.send_pin(pin)
  end
end
