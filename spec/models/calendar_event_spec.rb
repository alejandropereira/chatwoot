require 'rails_helper'

RSpec.describe CalendarEvent, type: :model do
  context 'associations' do
    it { is_expected.to have_many(:event_invitees) }
    it { is_expected.to have_many(:invitees) }
  end
end
