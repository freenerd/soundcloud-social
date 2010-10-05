function handle_sc_url() {
  url = $('#sc_url').get(0).value;
  url = url.split('soundcloud.com');
  if(url[1]) {
    window.location = url[1];
  } else {
      $("#enter-sc-url p").addClass("red");
  };
};

$(document).ready(function(){
  // Enter SC URL dispatch
  $('#sc_url').keypress(function(e) {
    code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) {
      handle_sc_url();
    }
  });

  $('#sc_url').bind('paste', function() {
    // some browsers need some time to catchup with the paste ...
    setTimeout(function(){
      handle_sc_url();
    }, 300);
  });
});

