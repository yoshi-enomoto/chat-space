$(function() {

//メッセージ送信の非同期通信
  function buildHTML(message){
    var body = message.body ? `<p class="lower-message__content">
                                 ${message.body}
                               </p>` : ""

    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : ""

    var html=`<div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="lower-meesage">
                  ${body}
                  ${image}
                </div>
              </div>`
    return html;
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action");

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".form__message").val("");
      $(".hidden").val("");
      $(".form__submit").removeAttr("disabled");
      $(".messages").animate({scrollTop :$(".messages")[0].scrollHeight});
    })
    .fail(function(){
      alert("error");
    })
  })

//自動更新機能の実装
  $(function(){
    setInterval(update, 5000);
  });

  function update(){
    $.ajax({
      url: location.href,
      type: "GET",
      dataType: "json"
    })
    .done(function(data) {
      var id = $(".message:last").data("message-id");
      data.messages.forEach(function(message){
        if (message.id > id) {
          var html = buildHTML(message);
          $(".messages").append(html);
          $(".messages").animate({scrollTop :$(".messages")[0].scrollHeight});
        }
      })
    })
  }
})
