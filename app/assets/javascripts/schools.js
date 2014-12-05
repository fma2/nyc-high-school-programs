// jQuery(function($) {
//     // Asynchronously Load the map API 
//     var script = document.createElement('script');
//     script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
//     document.body.appendChild(script);
// });


function prepareDataforMap(schoolData) {
  var schoolDataAry = new Array();
  for (i = 0; i < schoolData.length; i++) {
    schoolDataAry.push(
      [schoolData[i].printed_school_name, 
      parseFloat(schoolData[i].latitude), 
      parseFloat(schoolData[i].longitude), 
      schoolData[i].primary_address_line_1, 
      schoolData[i].city, 
      schoolData[i].state_code, 
      schoolData[i].zip, 
      schoolData[i].school_type, 
      schoolData[i].interest_area, 
      schoolData[i].program_name, 
      schoolData[i].urls
      ])
  };
  return schoolDataAry;
};
  
function addMarker(school_name, lat, lng, address, city, state, zip, school_type, interest_area, program_name, urls, map) {
  var point = new google.maps.LatLng(lat, lng);
  var marker = new google.maps.Marker({
      position: point,
      icon: "https://maps.gstatic.com/intl/en_us/mapfiles/markers2/measle_blue.png",
      map: map,
      title: school_name
  });

   var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h3 id="firstHeading" class="firstHeading">' + school_name + '</h3>' +
      '<div id="bodyContent">'+
      '<p><b>Address: </b>' + address + ', ' + city + ', ' + state + ' ' + zip + '<br>' +
      '<b>Type of School: </b>' + school_type + '</p>' +

      '<p><b>Program Name: </b>' + program_name + '<br>' +
      '<b>Interest Area: </b>' + interest_area + '<br>' +
      '<b>Website: <a href=' + urls + '>'+ urls + '</a><br><br>' + 
      '</div>'+
      '</div>';
      
  var infowindow = new google.maps.InfoWindow({ content: contentString });
  google.maps.event.addListener(marker, 'click', function() {
      infowindow.setContent(contentString);
      infowindow.open(map, marker);
  });
}

function initialize() {
  var styleArray = [
  {
    featureType: "all",
    stylers: [
      { saturation: -80 }
    ]
  },{
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      { hue: "#00ffee" },
      { saturation: 50 }
    ]
  },{
    featureType: "poi.business",
    elementType: "labels",
    stylers: [
      { visibility: "off" }
    ]
  }
  ];

  var mapOptions = {
    center: { lat: 40.718961617000446, lng: -73.97606602099967},
    zoom: 11,
    styles: styleArray
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
    addMarker(schoolData[i][0], schoolData[i][1], schoolData[i][2], schoolData[i][3],schoolData[i][4],schoolData[i][5], schoolData[i][6], schoolData[i][7], schoolData[i][8], schoolData[i][9], schoolData[i][10], map)
  }
  // Marker Clusterer code
  // var schoolData= prepareDataforMap(gon.schools);
  // var markers = [];
  // for (var i = 0; i < schoolData.length; ++i) {
  //   if (schoolData[i][1] != null || schoolData[i][2] != null) {
  //     var latlng = new google.maps.LatLng(schoolData[i][1], schoolData[i][2]);
  //     var marker = new google.maps.Marker(latlng);
  //     markers.push(marker);
  //   }
  // }
  // var markerCluster = new MarkerClusterer(map, markers);
}
google.maps.event.addDomListener(window, 'load', initialize);