$(function(){
  function buildHTML(message){
  var imagehtml = message.image.url == null ? "" : `<img src = ${ message.image.url } class = "message__text__image">`
  var html = `<div class = "message" data-id=${message.id}>
                 <div class = "upper-message">
                  <p class = "upper-message__user-name">
                    ${ message.user_name}
                  </p>
                  <p class = "upper-message__date">
                    ${ message.created_at }
                  </p>
                </div>
                <div class = " message__text">
                  <p class = "message__text__content">
                    ${ message.content}
                  </p>
                  ${imagehtml}
                </div>
            </div>`;
        return html;
  }

  $('#new_message').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html).animate({scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('メッセージを入力してください')
    })
    .always(function(){
      $('.form__input-box_submit').prop('disabled',false);
    });
  });

    //自動更新
  var reloadMessages = function(){
    last_message_id = $(".message:last").data('id');
     last_group = $(".chat-main__header__current-group_name").data('id');
if (location.href.match(/\/groups\/\d+\/messages/)){
     $.ajax({
      url: `/groups/${last_group}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id,
             group_id: last_group}
    })
    .done(function(messages){
      var insertHTML = '';
      messages.forEach(function(message){
        var insertHTML = buildHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
        console.log("777")
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました');
      console.log("111")
    });
  }
  };
  setInterval(reloadMessages, 5000);
});




// if (location.href.match(/\/groups\/\d+\/messages/)){}