class ContactMailer < ApplicationMailer
  def send_pin(pin)
    @pin = pin

    mail to: pin.verificable.email
  end
end
