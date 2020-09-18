$(document).mouseup(function(e){
  var container = $(".sideMenu");

  // If the target of the click isn't the container
  if(!container.is(e.target) && container.has(e.target).length === 0){
      container.hide();
  }
});