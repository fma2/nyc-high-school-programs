//Mapbox access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZm1hMiIsImEiOiJkcmdtd0NjIn0.dw0I__cIjfXpz37Yj0DQmw';


//Place map
var map = L.mapbox.map('map').setView([40.78, -73.94], 11).addLayer(L.mapbox.tileLayer('fma2.kgkm6i0a'));

var filters = document.getElementById('filters');

$(document).ready(function() {
  $.ajax({
    dataType: 'json',
    url: '/',
    type: 'GET'
  }).success(function(data) {
    var featureLayer = L.mapbox.featureLayer(data)
    var clusterGroup = new L.MarkerClusterGroup();
    featureLayer.eachLayer(function(layer) {
      clusterGroup.addLayer(layer);
    })
    // map.addLayer(clusterGroup);

    var typesObj = {}, types = [];

    clusterGroup.eachLayer(function(marker) {
      var properties = marker.feature.properties
      popupContent = '<div class="popup">' +
      '<h3>' + properties.name + '</h3>' +
      '<p>' + properties.address + ', ' + properties.zip + '</p>' +
      '<p>Grades: ' + properties.grade_span_min + ' to ' + properties.grade_span_max + '</p>' +
      '<p>Type: ' + properties.type + '</p>' +
      '</div>'
      marker.bindPopup(popupContent, {
        closeButton: false,
        minWidth: 320
      });
      var feature = marker.feature
      typesObj[feature.properties['type']] = true;
    })
    for (var k in typesObj) types.push(k);
    var checkboxes = [];
    for (var i = 0; i < types.length; i++) {
    // Create an an input checkbox and label inside.
      var item = filters.appendChild(document.createElement('div'));
      var listItem = item.appendChild(document.createElement('li'));
      var checkbox = listItem.appendChild(document.createElement('input'));
      var label = listItem.appendChild(document.createElement('label'));
      checkbox.type = 'checkbox';
      checkbox.id = types[i];
      checkbox.checked = false;
      // create a label to the right of the checkbox with explanatory text
      label.innerHTML = types[i];
      label.setAttribute('for', types[i]);
      // Whenever a person clicks on this checkbox, call the update().
      checkbox.addEventListener('change', update);
      checkboxes.push(checkbox);
    }
     // This function is called whenever someone clicks on a checkbox and changes
  // the selection of markers to be displayed.
    function update() {
      var enabled = {};
      // Run through each checkbox and record whether it is checked. If it is,
      // add it to the object of types to display, otherwise do not.
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) enabled[checkboxes[i].id] = true;

      }
      featureLayer.setFilter(function(feature) {
        var x = (feature.properties['type'] in enabled)
        // console.log("trying to filter");
      // If this symbol is in the list, return true. if not, return false.
      // The 'in' operator in javascript does exactly that: given a string
      // or number, it says if that is in a object.
      // 2 in { 2: true } // true
      // 2 in { } // false
        return (feature.properties['type'] in enabled);
      });

      map.removeLayer(clusterGroup);
      clusterGroup = new L.MarkerClusterGroup();
      featureLayer.eachLayer(function(layer) {
        clusterGroup.addLayer(layer);
      })
      map.addLayer(clusterGroup);
      clusterGroup.eachLayer(function(marker) {
        var properties = marker.feature.properties
        popupContent = '<div class="popup">' +
                      '<h3>' + properties.name + '</h3>' +
                      '<p>' + properties.address + ', ' + properties.zip + '</p>' +
                      '<p>Grades: ' + properties.grade_span_min + ' to ' + properties.grade_span_max + '</p>' +
                      '<p>Type: ' + properties.type + '</p>' +
                      '</div>'
        marker.bindPopup(popupContent, {
          closeButton: false,
          minWidth: 320
        });
        var feature = marker.feature
        typesObj[feature.properties['type']] = true;
      })
    }
  })
})

//Add Marker list on right
// var markerList = document.getElementById('marker-list');
// map.featureLayer.on('layeradd', function(e) {
//     map.featureLayer.eachLayer(function(layer) {
//         var item = markerList.appendChild(document.createElement('li'));
//         item.innerHTML = layer.toGeoJSON().properties.name;
//         item.onclick = function() {
//            map.setView(layer.getLatLng(), 14);
//            layer.openPopup();
//         };
//     });
// });

//Geocoder search bar
var output = document.getElementById('output');
// Initialize the geocoder control and add it to the map.
var geocoderControl = L.mapbox.geocoderControl('mapbox.places-v1', {
  autocomplete: true
});
geocoderControl.addTo(map);


