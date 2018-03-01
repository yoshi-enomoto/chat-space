$(function() {
  function buildHTML(message){
    var body = message.body ? `<p class="lower-message__content">
                                 ${message.body}
                               </p>` : ""

    var image = message.image ? `<img class="lower-message__image" src="${message.image}">` : ""

    var html=`<div class="message">
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
    // console.log(this);
    // var formData = new FormData($("form")[0])
    var formData = new FormData(this);
    var url = $(this).attr("action");
    // console.log(url);

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data) {
      console.log(data);
      var html = buildHTML(data);
      $(".messages").append(html);
      $(".form__message").val("");
      $(".form__submit").removeAttr("disabled");
      $(".messages").animate({scrollTop :$(".messages")[0].scrollHeight});
      // alert("メッセージが送信されました");
    })
    .fail(function(){
      alert("error");
    })
  })
})
