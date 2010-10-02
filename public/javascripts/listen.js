$(document).ready(function(){
  $('#send_message_button').click(function( ){
    $.post(send_method_url,
           { message: $('#send_message').get(0).value,
             user: "unkown"}
          );
  });

  $('#send_message').keypress(function(e) {
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      $('#send_message_button').click(); e.preventDefault();
    };
  });


  Socky.prototype.respond_to_message = function(msg) {
    $("#messages").append('<li>' + msg + '</li>')
  };
});
