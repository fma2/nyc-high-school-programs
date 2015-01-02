//Variables for items on menu
var toggleBar = document.getElementById('toggleBar')
var allSchoolsToggle = document.getElementById('listToggle')
var filtersToggle = document.getElementById('filtersToggle')
var searchToggle = document.getElementById('searchToggle');

var markerList = document.getElementById('markers-list')
var typesList = document.getElementById('types-list');
var interestAreasList = document.getElementById('interest-areas-list');
var clusterGroup, featureLayer;
var filterItemObj = {}, checkboxes=[];
var rawData;

//Place all school markers on map at load
$.ajax({
  dataType: 'json',
  url: '/',
  type: 'GET'
}).success(function(data){
  rawData = data;
  loadAllSchools(data);
});

//Function that places all schools on map
function loadAllSchools(data) {
  $("#search-option").hide();
  $("#filters").hide();
  $("#markers-list").show();
  featureLayer = L.mapbox.featureLayer(data)
  clusterGroup = createClusterGroup(featureLayer)
  map.addLayer(clusterGroup);  
  clusterGroup.eachLayer(function(marker) {
    addMarkerContent(marker);
  })  
  createAllSchoolsMarkerList(featureLayer);  
  finishedLoading();
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
     map.setView(layer.getLatLng(), 22);
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
  startLoading();  
  setTimeout(function() {
    loadAllSchools(rawData);
  }, 500);
}

//Filters toggle
filtersToggle.onclick = function(e) {
  map.removeLayer(clusterGroup);
  $("#markers-list").hide();
  $("#search-option").hide(); 
  $("#filters").show();  
  typesList.innerHTML = '';
  interestAreasList.innerHTML = '';  
  filtersLayer = L.mapbox.featureLayer(rawData);
  var typesArr = createFilterList(filtersLayer, 'type');
  var programsArr = createFilterList(filtersLayer, 'interest_area');

  displayFilterList(typesList, typesArr, 'type');
  displayFilterList(interestAreasList, programsArr, 'interest_area');
}

//Filtering methods
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

function displayFilterList(pageElement, array, field) {
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
      checkbox.name = field;
      // if (field == "type") {
      //   checkbox.name = "type";
      // } else if (field =="interest_area") {
      //   checkbox.name = "interest_area";
      // }
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

function createMarkerList(data) {
  var filteredListSection = document.getElementById('filtered-list');
  filteredListSection.innerHTML = '';
  data.eachLayer(function(layer) {
    var school = filteredListSection.appendChild(document.createElement('a'));
    school.setAttribute('class', 'col4 quiet button');
    school.innerHTML = layer.toGeoJSON().properties.name;
    school.onclick = function() {
     map.setView(layer.getLatLng(), 22);
     layer.openPopup();
   };
 });
  $(filteredListSection).show()
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
      'marker-color': '#ff8888',
      'marker-symbol': 'star'
    }
  });
});

// If the user chooses not to allow their location
// to be shared, display an error message.
map.on('locationerror', function() {
  geolocate.innerHTML = 'Position could not be found';
});

