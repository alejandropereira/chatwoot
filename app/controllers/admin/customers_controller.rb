class Admin::CustomersController < Admin::BaseController
    def index
        @customers = Contact.all
    end
end