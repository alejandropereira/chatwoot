require 'rails_helper'

module Queries
  module WebWidgets
    RSpec.describe "webWidget", type: :request do
      describe '.resolve' do
        it 'gets a web widget and generate token' do
          widget = create(:channel_widget)

          post '/graphql', params: { query: query(website_token: widget.website_token) }
          json = JSON.parse(response.body)
          puts json
          data = json['data']['webWidget']

          expect(data).to include(
            "widget" => { "id" => be_present },
            "token" => be_present
          )
        end

        it 'should return error with non existing web widget' do
          post '/graphql', params: { query: query(website_token: "no_id") }
          json = JSON.parse(response.body)
          errors = json['error']

          expect(errors).to be_present
        end
      end

      def query(website_token:)
        <<~GQL
          query {
            webWidget(websiteToken: "#{website_token}") {
              widget {
                id
              }
              token
            }
          }
        GQL
      end
    end
  end
end
