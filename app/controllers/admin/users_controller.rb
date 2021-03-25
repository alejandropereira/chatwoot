class Admin::UsersController < Admin::BaseController
    def index
        @users = AccountUser.all.map(&:user)
    end
end