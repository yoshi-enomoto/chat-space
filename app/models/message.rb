class Message < ApplicationRecord
  belong_to :group
  belong_to :user

  validates :body, presence: true, unless: :image?
end
