$(function(){
  function buildHTML(message){
  var html = `<div class = "message">
                 <div class = "upper-message">
                  <p class = "upper-message__user-name">
                    ${ message.user_name}
                  </p>
                    ${ message.created_at }
                  </p>
                </div>
                <div class = " message__text">
                  <p class = "message__text__content">
                    ${ message.content}
                  </p>
                  <img src = ${ message.image.url } class = "message__text__image">
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
      $('.messages').append(html);
      $('#new_message')[0].reset();
      scroll()
    })
    .fail(function(){
      alert('メッセージを入力してください')
    })
    .always(function(){
      $('.form__input-box_submit').prop('disabled',false);
    });
  });

  var buildMessageHTML = function(message){
      var html = '<div class = "message" data-id= '+ message.id + '>' +
                    '<div class = "upper-message">' +
                      '<p class = "upper-message__user-name">' +
                      message.user_name +
                      '</p>' +
                      message.created_at +
                      '</p>' +
                    '</div>' +
                    '<div class = "message__text">' +
                      '<p class = "message__text__content">' +
                      message.content +
                      '</p>' +
                      '</div>' +
                  '</div>'
  } else if (message.content) {
    var html = '<div class = "message" data-id= '+ message.id + '>' +
                  '<div class = "upper-message">' +
                    '<p class = "upper-message__user-name">' +
                    message.user_name +
                    '</p>' +
                    '<p class = "upper-message__data">' +
                    message.created_at +
                    '</p>' +
                  '</div>' +
                  '<div class = "message__text">' +
                    '<p class = "message__text__content">' +
                    message.content +
                    '</p>' +
                  '</div>' +
                '</div>'
  } else if (message.image) {
    var html = '<div class = "message" data-id= '+ message.id + '>' +
                  '<div class = "upper-message">' +
                    '<p class = "upper-message__user-name">' +
                    message.user_name +
                    '</p>' +
                    '<p class = "upper-message__data">' +
                    message.created_at +
                    '</p>' +
                  `</div>` +
                  '<div class = "message__text">' +
                    '<img src ="' + message.image + '" class = "message__text__image" >' +
                  '</div>' +
                '</div>'
  };
    return html;
  };
  var reloadMessages = function(){
    last_message_id = $(".message:last").data('id');
     last_group = $(".chat-main__header__current-group_name").data('id');
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
        var insertHTML = buildMessageHTML(message);
        $('.messages').append(insertHTML);
        $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight},'fast');
      })
    })
    .fail(function(){
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 5000);
});
