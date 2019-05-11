class MessagesController < ApplicationController
  def index
  end

  def create
    @message = @group.message.new(message_params)
    if @message.save
      redirect_to do |format|
        format.html { redirect_to group_message_path(@group), notice: 'メッセージが送信されました'}
        format.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください'
      render :index
    end
 end
end

