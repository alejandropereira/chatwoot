class DeviseFormBuilder < ActionView::Helpers::FormBuilder
  def text_field(attribute, options = {})
    super(attribute, options.reverse_merge(class: "block w-full px-3 py-2 placeholder-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md text-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"))
  end

  def email_field(attribute, options = {})
    super(attribute, options.reverse_merge(class: "block w-full px-3 py-2 placeholder-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md text-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"))
  end

  def password_field(attribute, options = {})
    super(attribute, options.reverse_merge(class: "block w-full px-3 py-2 placeholder-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md text-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"))
  end

  def label(attribute, text = nil, options = {})
    super(attribute, text, options.reverse_merge(class: "px-1 text-sm text-gray-600"))
  end

  def submit(attribute, options = {})
    super(attribute, options.reverse_merge(class: "block w-full px-6 py-2.5 mt-3 text-base font-semibold text-white bg-gray-800 rounded-lg shadow-xl hover:text-white hover:bg-black"))
  end
end
