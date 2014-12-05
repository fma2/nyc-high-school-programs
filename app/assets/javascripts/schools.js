// jQuery(function($) {
//     // Asynchronously Load the map API 
//     var script = document.createElement('script');
//     script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
//     document.body.appendChild(script);
// });


function prepareDataforMap(schoolData) {
  var schoolDataAry = new Array();
  for (i = 0; i < schoolData.length; i++) {
    schoolDataAry.push([schoolData[i].printed_school_name, parseFloat(schoolData[i].latitude), parseFloat(schoolData[i].longitude)])
  };
  return schoolDataAry;
};

function prepareDataforMapWithoutName(schoolData) {
  var schoolDataAry = new Array();
  for (i = 0; i < schoolData.length; i++) {
    schoolDataAry.push([parseFloat(schoolData[i].latitude), parseFloat(schoolData[i].longitude)])
  };
  return schoolDataAry;
};
  
function addMarker(name, lat, lng, map) {
  var point = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
      position: point,
      // icon: "bullet-red-icon.png",
      map: map,
      title: name
  });
  var infowindow = new google.maps.InfoWindow({ content: name });
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(name);
      infowindow.open(map, marker);
  });
}

function initialize() {
  directionsDisplay = new google.maps.DirectionsRenderer();
  geocoder = new google.maps.Geocoder();

  var mapOptions = {
    center: { lat: 40.718961617000446, lng: -73.97606602099967},
    zoom: 11
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
  map.setTilt(45);

  //test markers
  // addMarker("Hello", 40.718961617000446, -73.97606602099967, map);
  // addMarker("Yo", 40.8, -73.97606602099967, map);
  // addMarker("Hi", 40.723, -73.97606602099967, map);


  var schoolData = prepareDataforMap(gon.schools);
  for (i = 0; i < schoolData.length; i++) {
    addMarker(schoolData[i][0], schoolData[i][1], schoolData[i][2], map)
  }

  // Marker Clusterer code
  // var schoolDataNoName = prepareDataforMapWithoutName(gon.schools);
  // var markers = [];
  // for (var i = 0; i < schoolDataNoName.length; ++i) {
  //   if (schoolDataNoName[i][0] != null || schoolDataNoName[i][1] != null) {
  //     var latlng = new google.maps.LatLng(schoolDataNoName[i][0], schoolDataNoName[i][1]);
  //     var marker = new google.maps.Marker(latlng);
  //     markers.push(marker);
  //   }
  // }
  // var markerCluster = new MarkerClusterer(map, markers);
}
google.maps.event.addDomListener(window, 'load', initialize);