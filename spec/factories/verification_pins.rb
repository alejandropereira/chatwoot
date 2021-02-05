FactoryBot.define do
  factory :verification_pin do
    code { "MyString" }
    association :verificable, factory: :contact
  end
end
