$(document).ready(function(){
  // Chat

  // hide chat and display username input
  $('#chat').hide();
  $('#enter-username').show();
  $('#chat-box').addClass('input-username');

  // start chat
  $('#username').keypress(function(e) {
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      username = $('#username').val();
      if ($('#username').val() != '') {
        user = username;
        $('#chat-box').slideUp('fast');
        $('#chat').show();
        $('#enter-username').hide();
        $('#chat-box').removeClass('input-username')
                      .addClass('in-chat')
                      .slideDown('fast');
        
        // login
        $.post(login_url,
               { user: user,
                 channel: channel
               }
        );

        //register logout hook
        window.onunload = function() {
          $.post(logout_url,
                { user: user,
                  channel: channel
                }
          );
        };
      };
    };
  });

  // send a message
  $('#send_message_button').click(function( ){
    $.post(message_method_url,
           { message: $('#send_message').get(0).value,
             channel: channel,
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
  soundcloud.debug = false;
  soundcloud_playing = false;
  soundcloud.addEventListener('onMediaPlay', function(player, data) {
    if (!soundcloud_playing) {
      $.post(start_url,
            { position: player.api_getTrackPosition(),
              channel: channel }
      );
      soundcloud_playing = true;
    };
    console.log("Track plays");
  });

  soundcloud.addEventListener('onMediaPause', function(player, data) {
    if (soundcloud_playing) {
      $.post(pause_url,
             { channel: channel }
      );
      soundcloud_playing = false;
    }
    console.log("Track paused");
  });
  // End SC Player


  // Receive Socky Messages
  Socky.prototype.respond_to_message = function(message) {
    console.log(message);
    msg = JSON.parse(message);
    console.log(msg);
    if (!msg['channel'] || msg['channel'] == channel) {
       switch(msg['action']) {
        case "login": $("#messages").append('<li><i>' + msg['user'] + ' came online</i></li>');
                          break;   
        case "logout": $("#messages").append('<li><i>' + msg['user'] + ' left</i></li>');
                          break;      
        case "message":  $("#messages").append('<li><b>' + msg['user'] + ':</b> ' + msg['message'] + '</li>');
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
       // Make Chat scroll down
       var chatDiv = $('#messages_container');
       $(chatDiv).scrollTop(100000000000000000);
    };
  };
  // End Receive Socky Message

  // Put the player in the div evil hack
  $('#player-placeholder').append($('#scPlayer'))

});
