$(function() {
  $(".form").submit(function(e) {
    e.preventDefault();
    console.log(this);
    var formData = new FormData($("form")[0])
    // var formData = new FormData(this);
    var url = $(this).attr("action");
    // var url = $(formData).attr("action");
    console.log(formData);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
  })
})
