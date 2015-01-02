//Mapbox access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZm1hMiIsImEiOiJkcmdtd0NjIn0.dw0I__cIjfXpz37Yj0DQmw';

//Place map and load all markers
var map = L.mapbox.map('map', 'fma2.kj0p9jdj', {zoomControl:false, attributionControl: false}).setView([40.75, -74.09], 11);
map.addControl(L.mapbox.infoControl().addInfo('<a href="https://www.mapbox.com/about/maps/" target="_blank">Maps &copy; Mapbox &copy; OpenStreetMap</a>',{position: 'bottomright'}));


var zoomControl = new L.Control.Zoom({position: 'bottomright' })
zoomControl.addTo(map);

// var shareControl = L.mapbox.shareControl('fma2.kgkm6i0a', {position:'bottomright'})
// shareControl.addTo(map)

//Geocoder search bar
// Initialize the geocoder control and add it to the map.
var geocoderControl = L.mapbox.geocoderControl('mapbox.places-v1', {
  autocomplete: true, position: 'topright', keepOpen: false
});
geocoderControl.addTo(map);