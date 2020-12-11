module FrontendUrlsHelper
  def frontend_url(path, subdomain, **query_params)
    url_params = query_params.blank? ? '' : "?#{query_params.to_query}"
    "#{root_url(subdomain: subdomain)}app/#{path}#{url_params}"
  end
end
