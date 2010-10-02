$(document).ready(function(){
  // Buttons
  $('#send_message_button').click(function( ){
    $.post(message_method_url,
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

  $('#start_button').click(function(){
    $.post(start_url, function(){ true });
  });

  $('#pause_button').click(function(){
    $.post(pause_url);
  });

  $('#reset_button').click(function(){
    $.post(reset_url);
  });
  // End Buttons


  // SC Player
  soundcloud.debug = true;
  // End SC Player


  // Receive Socky Messages
  Socky.prototype.respond_to_message = function(msg) {
    $("#messages").append('<li>' + msg + '</li>')
    switch(msg) {
      case "start": player.api_play();                    
                    console.log("play");
                    break;
      case "pause":  player.api_stop();                    
                    console.log("stop");
                    break;
      case "reset": player.api_seekTo(0);
                    console.log("reset");
                    break;
    };
  };
  // End Receive Socky Messages
});
