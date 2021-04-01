class UserReflex < ApplicationReflex
    def create
        @user =  User.find_by(email: new_agent_params[:email])
        @user = User.new(new_agent_params.slice(:email, :name, :password, :password_confirmation)) unless @user

        if @user.save
            save_account_user!
            cable_ready.insert_adjacent_html(
                selector: "#users",
                html: render(partial: "admin/users/user", locals: { user: @user })
            ).dispatch_event(
                name: "modal:close"
            ).broadcast
        else
            cable_ready.inner_html(
                selector: "#user_new_form",
                html: render(partial: "admin/users/form", locals: { user: @user })
            ).broadcast
        end

        morph :nothing
    end

    private

    def save_account_user!
        AccountUser.create!(
          account_id: Current.account.id,
          user_id: @user.reload.id,
          role: new_agent_params[:role],
          inviter_id: current_user.id
        )
      end

    def new_agent_params
        time = Time.now.to_i
        params.require(:user).permit(:email, :name, :role)
              .merge!(password: time, password_confirmation: time, inviter: current_user)
      end
end