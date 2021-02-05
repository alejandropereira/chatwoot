# == Schema Information
#
# Table name: verification_pins
#
#  id               :bigint           not null, primary key
#  code             :string
#  verificable_type :string           not null
#  created_at       :datetime         not null
#  updated_at       :datetime         not null
#  verificable_id   :bigint           not null
#
# Indexes
#
#  index_verification_pins_on_verificable_type_and_verificable_id  (verificable_type,verificable_id)
#
class VerificationPin < ApplicationRecord
  before_save :generate_code
  belongs_to :verificable, polymorphic: true
  after_create :send_notification_email

  def check_pin(pin)
    code == pin
  end

  private

  def generate_code
    self.code = (0..9).to_a.sample(4).join
  end

  def send_notification_email
    ContactMailer.send_pin(self).deliver_later
  end
end
