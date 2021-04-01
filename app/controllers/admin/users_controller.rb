class Admin::UsersController < Admin::BaseController
    def index
        @users = AccountUser.all.includes(user: :avatar_attachment).map(&:user)
    end
end