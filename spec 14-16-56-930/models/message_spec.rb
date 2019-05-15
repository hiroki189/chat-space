require 'rails_helper'

Rspec.decribe Message, type: :model do
  describe '#create' do
    content 'can save'do
      it 'is valid with content' do
        expect(build(:message, image: nill)).to be_valid
      end
      
      it 'is valid with image' do
        expect(build(:message, content: nill)).to be_valid
      end

      it 'is valid with content and image' do
        expect(build(:message)).to be_valid
      end
    end

    content 'can not save' do
      it 'is invalid without content and image' do
        message = build(:message, content: nill, image: nill)
        message.valid?
        expect(message.errors[:content]).to include('を入力してください')
      end

      it 'is invalid without group_id' do
        message = build(:messaage, group_id: nill)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invalid without user_id' do
        message = build(:message, user_id: nill)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end