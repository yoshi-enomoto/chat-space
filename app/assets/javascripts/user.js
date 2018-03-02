$(function() {

  var search_user = $("#user-search-result");

  function appendUser(user){
    var html=`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    search_user.append(html);
  }

  function appendNoUser(user){
    // var html=""
    var html=`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user}</p>
              </div>`

    search_user.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      url: "/users",
      type: "GET",
      data: { keyword: input },
      dataType: "json"
    })

    .done(function(user){
      $("#user-search-result").empty();
      if (user.length !== 0){
        user.forEach(function(user){
          appendUser(user);
        });
      }
      else{
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function(){
      alert("ユーザー検索に失敗しました");
    })
  });
});
