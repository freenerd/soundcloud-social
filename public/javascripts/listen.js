$(document).ready(function(){
  // Chat
  $('#send_message_button').click(function( ){
    $.post(message_method_url,
           { message: $('#send_message').get(0).value,
             user: user}
          );
    $('#send_message').get(0).value = "";
  });

  $('#send_message').keypress(function(e) {
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      $('#send_message_button').click(); e.preventDefault();
    };
  });
  // End Chat

  // SC Player
  soundcloud.debug = true;
  soundcloud_playing = false;
  soundcloud.addEventListener('onMediaPlay', function(player, data) {
    if (!soundcloud_playing) {
      $.post(start_url,
            {position: player.api_getTrackPosition()});
      soundcloud_playing = true;
    };
    console.log("Track plays");
  });

  soundcloud.addEventListener('onMediaPause', function(player, data) {
    if (soundcloud_playing) {
      $.post(pause_url);
      soundcloud_playing = false;
    }
    console.log("Track paused");
  });

  // End SC Player


  // Receive Socky Messages
  Socky.prototype.respond_to_message = function(message) {
    console.log(message);
    msg = message.split(':',3)
    console.log(msg);
    switch(msg[0]) {
      case "subscribe": $("#messages").append('<li><i>' + msg[1] + ' came online</i></li>');
                       // Make Chat scroll down
                       var chatDiv = $('#messages_container');
                       $(chatDiv).scrollTop(100000000000000000);
                       break;   
      case "unsubscribe": $("#messages").append('<li><i>' + msg[1] + ' left</i></li>');
                       // Make Chat scroll down
                       var chatDiv = $('#messages_container');
                       $(chatDiv).scrollTop(100000000000000000);
                       break;      
      case "message":  $("#messages").append('<li><b>' + msg[1] + ':</b> ' + msg[2] + '</li>');
                       // Make Chat scroll down
                       var chatDiv = $('#messages_container');
                       $(chatDiv).scrollTop(100000000000000000);
                       break;

      case "start":    player.api_seekTo(0)
                       player.api_play();
                       console.log("message play");
                       break;
      case "pause":    player.api_stop();                    
                       console.log("message pause");
                       break;
      case "reset":    player.api_seekTo(0);
                       console.log("reset");
                       break;
    };
  };
  // End Receive Socky Message

  // Put the player in the div evil hack
  $('#player-placeholder').append($('#scPlayer'))

});
