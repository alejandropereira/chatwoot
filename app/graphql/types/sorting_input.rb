class Types::SortingInput < Types::BaseInputObject
  description "Attributes for sorting records"
  argument :field, Types::SortFieldEnum, required: true
  argument :order, Types::SortOrderEnum, required: true
end