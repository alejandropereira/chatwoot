class Workspace
    include ActiveModel::Model
    attr_accessor :name_or_subdomain, :subdomain

    validates :name_or_subdomain, presence: true

    def valid_account?
        account = Account.find_by("LOWER(name) = ? OR subdomain = ?", name_or_subdomain, name_or_subdomain.parameterize)

        if account.present?
            self.subdomain = account.subdomain 
            return true
        end

        false
    end
end