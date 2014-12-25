//Mapbox access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZm1hMiIsImEiOiJkcmdtd0NjIn0.dw0I__cIjfXpz37Yj0DQmw';

//Place map and load all markers
var map = L.mapbox.map('map', 'fma2.kgkm6i0a', {zoomControl:false, attributionControl: false}).setView([40.75, -74.09], 11);
map.addControl(L.mapbox.infoControl().addInfo('<a href="https://www.mapbox.com/about/maps/" target="_blank">Maps &copy; Mapbox &copy; OpenStreetMap</a>',{position: 'bottomright'}));

var zoomControl = new L.Control.Zoom({position: 'bottomright' })
zoomControl.addTo(map);

// var shareControl = L.mapbox.shareControl('fma2.kgkm6i0a', {position:'bottomright'})
// shareControl.addTo(map)

//Geocoder search bar
// Initialize the geocoder control and add it to the map.
var geocoderControl = L.mapbox.geocoderControl('mapbox.places-v1', {
  autocomplete: true, position: 'topright', keepOpen: true
});
geocoderControl.addTo(map);

//Variables for items on menu
var allSchoolsToggle = document.getElementById('listToggle')
var filtersToggle = document.getElementById('filtersToggle')
var searchToggle = document.getElementById('searchToggle');

var performanceToggle = document.getElementById('performanceToggle');

var markerList = document.getElementById('markers-list')
var typesList = document.getElementById('types-list');
var interestAreasList = document.getElementById('interest-areas-list');
var clusterGroup, featureLayer;
var filterItemObj = {}, checkboxes=[];
var rawData;

$("#search-option").hide();
$("#filters").hide()

//Place all school markers on map at load
$.ajax({
  dataType: 'json',
  url: '/',
  type: 'GET'
}).success(function(data){
  rawData = data;
  featureLayer = L.mapbox.featureLayer(data)
  clusterGroup = createClusterGroup(featureLayer)
  map.addLayer(clusterGroup);
  clusterGroup.eachLayer(function(marker) {
    addMarkerContent(marker);
  })
  createAllSchoolsMarkerList(featureLayer);
});

//Add modal content with Foundation
function addModalContent(marker) {
  var properties = marker.feature.properties
  var programs = properties.programs
  var modal = 
  '<div id="modal' + properties.dbn + '" class="reveal-modal" data-reveal>' +
  '<div id="modal-map"></div>' +
  '<h3 class="title fancy">' + properties.name + '</h3>' +
  '<section class="information">' +
  '<div class="tabs-content">' +
    '<div class="content active" id="basics">' +
      '<p class="address">' + properties.address + '</p>' +
      '<p class="contact"><span class="phone-number">' + properties.phone + '</span>' + ' | ' +'<span class="website"><a target="_blank" href="http://' + properties.website + '">website</a></span>' +
      '<p class="grades">Grades ' + properties.grade_span_min + ' to ' + properties.grade_span_max + '</p>' +
      '<p class="address">' + properties.type + '</p>' +
      '<p class=program-highlights>' + properties.program_highlights + '</p>' +
    '</div>' +
    '<div class="content" id="programs">' +
      '<p></p>' + //add information on schools' programs here
    '</div>' +
    '<div class="content" id="performance">' +
      '<p></p>' + //add information on schools' performance here
    '</div>' +
  '</div>' +
  '<dl class="tabs" data-tab>' +
  '<dd class="active"><a href="#basics"><h3>basics</h3></a></dd>' +
  '<dd><a href="#programs"><h3>programs</h3></a></dd>' +
  '<dd><a href="#performance"><h3>performance</h3></a></dd>' +
  '</dl>' +
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
  // '<p class="icon book"></p>' +
  '</div>' +
  '<div class="info">' +
  '<h3 class="popup-title">' + properties.name + '</h3>' +
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
    school.setAttribute('class', 'col6 button quiet');
    school.innerHTML = layer.toGeoJSON().properties.name;
    school.onclick = function() {
     map.setView(layer.getLatLng(), 16);
     layer.openPopup();
   };
 });
}

//Search toggle
searchToggle.onclick = function(e) {
  $("#filters").hide()
  $("#markers-list").hide();
  $("#filtered-list").hide();
  $("#search-option").show();

}
//Marker list toggle
allSchoolsToggle.onclick = function(e) {
  map.removeLayer(clusterGroup);
  $("#filters").hide()
  $("#search-option").hide();
  $("#markers-list").show();
  markerList.innerHTML = '';
  featureLayer = L.mapbox.featureLayer(rawData)
  clusterGroup = createClusterGroup(featureLayer)
  map.addLayer(clusterGroup).setView([40.75, -74.09], 11);
  clusterGroup.eachLayer(function(marker) {
    addMarkerContent(marker);
  })
  createAllSchoolsMarkerList(featureLayer);
}

filtersToggle.onclick = function(e) {
  map.removeLayer(clusterGroup);
  $("#markers-list").hide();
  $("#search-option").hide(); 
  $("#filters").show()
  
  typesList.innerHTML = '';
  interestAreasList.innerHTML = '';

  filtersLayer = L.mapbox.featureLayer(rawData);
  var typesArr = createFilterList(filtersLayer, 'type')
  var programsArr = createFilterList(filtersLayer, 'interest_area')

  displayFilterList2(typesList, typesArr, 'type')
  displayFilterList2(interestAreasList, programsArr, 'interest_area')
}

function createFilterList(data, field) {
  var filterItems = [], filterItemObj = {}; 
  data.eachLayer(function(marker) {
    if (field === "type") {
      var feature = marker.feature
      filterItemObj[feature.properties[field]] = true;
    } else if (field === "interest_area") {
      var programsList = marker.feature.properties.programs
      for (i=0; i<programsList.length; i++) {
        filterItemObj[programsList[i][field]] = true;      
      }
    }
  })
  for (var k in filterItemObj) filterItems.push(k);
  return filterItems;   
}

function displayFilterList2(pageElement, array, field) {
  if (typesList.innerHTML == '' || interestAreasList.innerHTML == '') {
    for (var i = 0; i < array.length; i++) {
      // Create an an input checkbox and label inside.
      var listItem = pageElement.appendChild(document.createElement('a'));
      listItem.setAttribute('class', 'col4 button quiet');

      var checkbox = listItem.appendChild(document.createElement('input'));
      var label = listItem.appendChild(document.createElement('label'));
      checkbox.type = 'checkbox';
      checkbox.id = array[i];
      checkbox.checked = false;
      if (field == "type") {
        checkbox.name = "type";
      } else if (field =="interest_area") {
        checkbox.name = "interest_area";
      }
      label.innerHTML = array[i];
      label.setAttribute('for', array[i]);
      checkboxes.push(checkbox);
    }
  }
}

var filters = document.getElementById("filters");
filters.onchange = changeMap;

function changeMap() {
  var enabled = {};
  var namesOfChecked = {};
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      enabled[checkboxes[i].id] = true;
      namesOfChecked[checkboxes[i].name] = true;
      }
  }
  console.log(namesOfChecked);

  featureLayer = L.mapbox.featureLayer(rawData);

  featureLayer.setFilter(function(feature) {
    if ("type" in namesOfChecked && "interest_area" in namesOfChecked) {
      var programsList = feature.properties.programs
      for (i=0; i<programsList.length; i++) {
        if (programsList[i]['interest_area'] in enabled && feature.properties['type'] in enabled) {
          return true;
        }
      }
    } else if ("type" in namesOfChecked) {
      return (feature.properties["type"] in enabled);      
    } else if ("interest_area" in namesOfChecked) {
        var programsList = feature.properties.programs
        for (i=0; i<programsList.length; i++) {
          if (programsList[i]['interest_area'] in enabled) {
            return true;
          }
        }
      } 
  });
  
  map.removeLayer(clusterGroup);
  clusterGroup = createClusterGroup(featureLayer)

  map.addLayer(clusterGroup).setView([40.75, -74.09], 11);
  
  clusterGroup.eachLayer(function(marker) {
    addMarkerContent(marker)
    var feature = marker.feature
    filterItemObj[feature.properties['type']] = true;
  })
  createMarkerList(featureLayer)
}

//////



//Add performance data filter to menu on click
performanceToggle.onclick = function(e) {
  $("#types-list").hide();
  $("#interest-areas-list").hide();
  $(".search-form").hide();
  $("#markers-list").hide();
}



//Filtering methods for types


function updateMapbyFilter(field) {
  // console.log("in update map by filter")
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
    school.setAttribute('class', 'col4 quiet button');
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
            'title': 'You!',
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

