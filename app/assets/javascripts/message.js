$(function(){
  function buildHTML(message){
  var html = `<div class = "message">
                <div class = "upper-messsage">
                  <div class = "upper-message__user-name">
                    ${ message.user_name}
                  </div>
                  <div class = "upper-message__date">
                    ${ message.time }
                  </div>
                </div>
                <div class = " message__text">
                  <p class = "message__text__content">
                    ${ message.content}
                  </p>
                </div>
            </div>`;
        return html;
  }
  function scroll(){
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
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
      $('.form__input-box_submit').prop('disabled',false);
      $('#new_message')[0].reset();
      scroll()
    })
    .fail(function(){
      alert('メッセージを入力してください')
      $('.form__input-box_submit').prop('disabled',false);
    })
  })
})