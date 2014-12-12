//Mapbox access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZm1hMiIsImEiOiJkcmdtd0NjIn0.dw0I__cIjfXpz37Yj0DQmw';

//Place map
var map = L.mapbox.map('map-canvas', 'examples.map-i86nkdio')
    .setView([40.718961617000446,-73.97606602099967], 9);

//Place markers
$(document).ready(function() {
  console.log("ready!");
  $.ajax({
    dataType: 'json',
    url: '/',
    type: 'GET'
  }).success(function(data) {  
      console.log("success!");
      console.log(data);
      map.featureLayer.setGeoJSON(data);
    })
  });

//Add custom popups for each marker
map.featureLayer.on('layeradd', function(e) {
  marker = e.layer;
  properties = marker.feature.properties;
  popupContent = '<div class="popup">' + 
                  '<h3>' + properties.name + '</h3>' +
                  '<p>' + properties.address + '</p>' +
                  '</div>'
  marker.bindPopup(popupContent, {
    closeButton: false, 
    minWidth: 320
  });
})