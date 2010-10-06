$(document).ready(function(){
  // about box closable
  $("#about-box a.close").click(function(ev) {
    $("#about-box").fadeOut('slow');
    ev.preventDefault();
  });    
                        
  // about box openable
  $("a#about").click(function(ev) {
    $("#about-box").fadeIn('slow');
    ev.preventDefault();
  });  
     
  // about box closes when click outside of box
  //$('body').click(function(){alert('test')});
  //$('body').click(function(event){console.log($('#about-box').index($(event.target).parents()))});
});
