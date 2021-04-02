class Admin::CustomersController < Admin::BaseController
    def index
        @pagy, @customers = pagy(current_account.contacts.all)
    end
end