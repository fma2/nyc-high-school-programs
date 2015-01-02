var loader = document.getElementById('loader');

startLoading();
function startLoading() {
  $("#map").toggleClass("loading");
  loader.className = '';
}

function finishedLoading() {
  loader.className = 'done';
  setTimeout(function() {
    loader.className = 'hide';
  }, 500);
  $("#map").toggleClass("loading");
}