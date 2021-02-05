require 'rails_helper'

RSpec.describe VerificationPin, type: :model do
  it "generates code" do
    contact = create(:contact)
    pin = create(:verification_pin, verificable: contact)

    puts pin.code
    expect(pin.code).to_not be_nil
    expect(pin.code.length).to eq 4
  end
end
