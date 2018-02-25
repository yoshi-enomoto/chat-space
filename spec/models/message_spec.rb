require "rails_helper"

RSpec.describe Message, type: :model do
  describe "#create" do
    context "can save" do

      it "is valid message" do
        message = build(:message, image: "")
        expect(message).to be_valid
      end

      it "is valid image" do
        message = build(:message, body: "")
        expect(message).to be_valid
      end

      it "is valid message and image" do
        message = build(:message)
        expect(message).to be_valid
      end
    end

    context "can't save" do

      it "is invalid body" do
        message = build(:message, body: "", image: "")
        message.valid?
        expect(message.errors[:body][0]).to include("入力してください")
      end

      it "is invalid group_id" do
        message = build(:message, group_id: "")
        message.valid?
        expect(message.errors[:group][0]).to include("入力してください")
      end

      it "is invalid user_id" do
        message = build(:message, user_id: "")
        message.valid?
        expect(message.errors[:user][0]).to include("入力してください")
      end

    end
  end
end
