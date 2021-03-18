class Admin::WorkspacesController < ActionController::Base
   layout 'devise'

   def new
        @workspace = Workspace.new
   end

   def create
    @workspace = Workspace.new(workspace_params)

    if @workspace.valid_account?
        redirect_to new_admin_session_url(subdomain: @workspace.subdomain)
    else
        flash[:alert] = "Workspace not found"
        render :new 
    end
   end

   private

   def workspace_params
    params.require(:workspace).permit(:name_or_subdomain)
   end
end