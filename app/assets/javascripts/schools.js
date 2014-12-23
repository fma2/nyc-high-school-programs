//Mapbox access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZm1hMiIsImEiOiJkcmdtd0NjIn0.dw0I__cIjfXpz37Yj0DQmw';

//Place map and load all markers
var map = L.mapbox.map('map', 'fma2.kgkm6i0a', {zoomControl:false, attributionControl: false}).setView([40.75, -74.09], 11);
map.addControl(L.mapbox.infoControl().addInfo('<a href="https://www.mapbox.com/about/maps/" target="_blank">Maps &copy; Mapbox &copy; OpenStreetMap</a>',{position: 'bottomright'}));

var zoomControl = new L.Control.Zoom({position: 'bottomright' })
zoomControl.addTo(map);

var shareControl = L.mapbox.shareControl('http://visualize-hs-nyc.herokuapp.com/', {position:'bottomright'})
shareControl.addTo(map)

//Geocoder search bar
// Initialize the geocoder control and add it to the map.
var geocoderControl = L.mapbox.geocoderControl('mapbox.places-v1', {
  autocomplete: true, position: 'topright', keepOpen: true
});
geocoderControl.addTo(map);

//Variables for items on menu
var allSchoolsToggle = document.getElementById('listToggle')
var typeToggle = document.getElementById('typesToggle')
var programsToggle = document.getElementById('programsToggle');
var performanceToggle = document.getElementById('performanceToggle');
var markerList = document.getElementById('markers-list')
var typesList = document.getElementById('types-list');
var interestAreasList = document.getElementById('interest-areas-list');
var clusterGroup, featureLayer;
var filterItemObj = {}, filterItems = [], checkboxes=[];

//Place all school markers on map at load
$.ajax({
  dataType: 'json',
  url: '/',
  type: 'GET'
}).success(function(data){
  var featureLayer = L.mapbox.featureLayer(data)
  clusterGroup = createClusterGroup(featureLayer)
  map.addLayer(clusterGroup);
  clusterGroup.eachLayer(function(marker) {
    addMarkerContent(marker);
    // addModalContent(marker);
  })
  createAllSchoolsMarkerList(featureLayer);
});

//Add modal content with Foundation
function addModalContent(marker) {
  var properties = marker.feature.properties
   var modal = 
  '<div id="modal' + properties.dbn + '" class="reveal-modal" data-reveal>' +
  '<div id="modal-map"></div>' +
  '<h3 class="title fancy">' + properties.name + '</h3>' +
  '<section class="information">' +
  '<p class="address">' + properties.address + '</p>' +
  '<p class="contact"><span class="phone-number">' + properties.phone + '</span>' + ' | ' +'<span class="website"><a target="_blank" href="http://' + properties.website + '">website</a></span>' +
  '<p class=program-highlights>' + properties.program_highlights + '</p>'
  '</section>' +
  '<a class="close-reveal-modal">&#215;</a>'+
  '</div>'
  $("body").append(modal);
  var modalId = '#modal' + properties.dbn;
  $(modalId).foundation('reveal', 'close')
}

//Displaying of markers methods
function addMarkerContent(marker) {
  var rightArrow = document.createElement("img")
  rightArrow.src = "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-right-128.png";
  rightArrow.alt="Right Arrow";
  rightArrow.id="right-arrow";
  rightArrow.className= "right-arrow";

  rightArrow.addEventListener('click',function(){openModal(properties)});

  var properties = marker.feature.properties;
  popupContent = 
  '<div class="popup">' +
  '<div class="type">' +
  '<p class="icon book"></p>' +
  '</div>' +
  '<div class="info">' +
  '<h3 class="popup-title">' + properties.name + '</h3>' +
  '<p class="grades">Grades ' + properties.grade_span_min + ' to ' + properties.grade_span_max + '</p>' +
  '<p class="address">' + properties.address + ', ' + properties.zip + '</p>' +
  '</div>' +
  '<a href="#" data-reveal-id="modal' + properties.dbn + '">' +
  rightArrow.outerHTML + '</a>'
  '</div>';
  
  addModalContent(marker);

  marker.bindPopup(popupContent, {
    closeButton: false,
    minWidth: 320
  });
}

function createClusterGroup(data) {
  var clusterGroup = new L.MarkerClusterGroup();
  data.eachLayer(function(layer) {
    clusterGroup.addLayer(layer);
  })
  return clusterGroup;
}

function createAllSchoolsMarkerList(data) {
  data.eachLayer(function(layer) {
    var school = markerList.appendChild(document.createElement('a'));
    school.setAttribute('class', 'col11 button');
    school.innerHTML = layer.toGeoJSON().properties.name;
    school.onclick = function() {
     map.setView(layer.getLatLng(), 16);
     layer.openPopup();
   };
 });
}

//Marker list toggle
allSchoolsToggle.onclick = function(e) {
  map.removeLayer(clusterGroup);
  $("#types-list").hide();
  $("#interest-areas-list").hide();
  $(".search-form").show();
  $("#markers-list").show();
  markerList.innerHTML = '';
  $.ajax({
    dataType: 'json',
    url: '/',
    type: 'GET'
  }).success(function(data){
    var featureLayer = L.mapbox.featureLayer(data)
    clusterGroup = createClusterGroup(featureLayer)
    map.addLayer(clusterGroup);
    clusterGroup.eachLayer(function(marker) {
      addMarkerContent(marker);
    })
    createAllSchoolsMarkerList(featureLayer);
  });
}

//Types filter list toggle
typesToggle.onclick = function(e) {
  map.removeLayer(clusterGroup);
  $("#markers-list").hide();
  $(".search-form").hide();
  $("#interest-areas-list").hide();
  $("#types-list").show();
  typesList.innerHTML = '';

  $.ajax({
    dataType: 'json',
    url: '/',
    type: 'GET'
  }).success(function(data) {
    featureLayer = L.mapbox.featureLayer(data)
    clusterGroup = createClusterGroup(featureLayer);

    var typesArr = createFilterList(clusterGroup, 'type');
    displayFilterList(typesList, typesArr, 'type');
  })
}

//Add programs filter to menu on click
programsToggle.onclick = function(e) {
  map.removeLayer(clusterGroup);
  $("#types-list").hide();
  $(".search-form").hide();
  $("#markers-list").hide();
  $("#interest-areas-list").show();
  interestAreasList.innerHTML = '';

  $.ajax({
    dataType: 'json',
    url: '/programs',
    type: 'GET'
  }).success(function(data) {
    featureLayer = L.mapbox.featureLayer(data)
    clusterGroup = createClusterGroup(featureLayer)
    
    var programsAry = createFilterList(clusterGroup, 'interest_area');
    displayFilterList(interestAreasList, programsAry, 'interest_area');
  });
}

//Add performance data filter to menu on click
performanceToggle.onclick = function(e) {
  $("#types-list").hide();
  $("#interest-areas-list").hide();
  $(".search-form").hide();
  $("#markers-list").hide();
}

//Filtering methods

function createFilterList(data, field) {
  filterItemObj = {}; filterItems = [];
  data.eachLayer(function(marker) {
    var feature = marker.feature
    filterItemObj[feature.properties[field]] = true;
  })
  for (var k in filterItemObj) filterItems.push(k);
    return filterItems;
}

function displayFilterList(pageElement, array, field) {
  checkboxes =[];
  for (var i = 0; i < array.length; i++) {
    // Create an an input checkbox and label inside.
    listItem = pageElement.appendChild(document.createElement('a'));
    listItem.setAttribute('class', 'col11 button');

    var checkbox = listItem.appendChild(document.createElement('input'));
    var label = listItem.appendChild(document.createElement('label'));
    checkbox.type = 'checkbox';
    checkbox.id = array[i];
    checkbox.checked = false;
    label.innerHTML = array[i];
    label.setAttribute('for', array[i]);
    checkbox.addEventListener('change', function(){updateMapbyFilter(field)});
    checkboxes.push(checkbox);
  }
}

function updateMapbyFilter(field) {
  var enabled = {};

  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) enabled[checkboxes[i].id] = true;
  }
  featureLayer.setFilter(function(feature) {
    var x = (feature.properties[field] in enabled)
    return (feature.properties[field] in enabled);
  });

  map.removeLayer(clusterGroup);
  clusterGroup = new L.MarkerClusterGroup();
  featureLayer.eachLayer(function(layer) {
    clusterGroup.addLayer(layer);
  })
  map.addLayer(clusterGroup).setView([40.75, -74.09], 11);
  clusterGroup.eachLayer(function(marker) {
    addMarkerContent(marker)
    var feature = marker.feature
    filterItemObj[feature.properties[field]] = true;
  })
  createMarkerList(featureLayer)
}

function createMarkerList(data) {
  var filteredListSection = document.getElementById('filtered-list');
  filteredListSection.innerHTML = '';
  data.eachLayer(function(layer) {
    var school = filteredListSection.appendChild(document.createElement('a'));
    school.setAttribute('class', 'col11 button');
    school.innerHTML = layer.toGeoJSON().properties.name;
    school.onclick = function() {
     map.setView(layer.getLatLng(), 16);
     layer.openPopup();
   };
 });
}




//Find user's location
var geolocate = document.getElementById('geolocate');
var userLocationLayer = L.mapbox.featureLayer().addTo(map);
if (!navigator.geolocation) {
    geolocate.innerHTML = 'Geolocation is not available';
} else {
    geolocate.onclick = function (e) {
        e.preventDefault();
        e.stopPropagation();
        map.locate();
    };
}

// Once we've got a position, zoom and center the map
// on it, and add a single marker.
map.on('locationfound', function(e) {
    map.fitBounds(e.bounds);
    userLocationLayer.setGeoJSON({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [e.latlng.lng, e.latlng.lat]
        },
        properties: {
            'title': 'Here I am!',
            'marker-color': '#ff8888',
            'marker-symbol': 'star'
        }
    });

    // And hide the geolocation button
    geolocate.parentNode.removeChild(geolocate);
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
    geolocate.innerHTML = 'Position could not be found';
});

