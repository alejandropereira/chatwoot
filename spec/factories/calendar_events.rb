FactoryBot.define do
  factory :calendar_event do
    title { "MyString" }
    start_time { "2021-04-15 12:43:15" }
    end_time { "2021-04-15 12:43:15" }
    account { nil }
  end
end
