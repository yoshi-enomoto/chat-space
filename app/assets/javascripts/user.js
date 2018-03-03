$(function() {

// ユーザー検索
  var search_user = $("#user-search-result");

  function appendUser(user){
    var html=`<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    search_user.append(html);
  }

  function appendNoUser(user){
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

// ユーザー検索--追加・削除
  var add_user = $(".chat-group-users");

  function adduser(userid,username){
    var html=`<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userid}'>
                <input name='group[user_ids][]' type='hidden' value='${userid}'>
                <p class='chat-group-user__name'>${username}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${userid}" data-user-name="${username}">削除</a>
              </div>`

    add_user.append(html);
  }

// --追加
  $(document).on("click",".user-search-add", function() {
    var userid = $(this).data("user-id");
    var username = $(this).data("user-name");
    $(this).parent().remove();
    adduser(userid,username);
  });

// --削除
    $(document).on("click",".user-search-remove", function() {
    $(this).parent().remove();
  });

});
