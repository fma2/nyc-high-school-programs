//Mapbox access token
L.mapbox.accessToken = 'pk.eyJ1IjoiZm1hMiIsImEiOiJkcmdtd0NjIn0.dw0I__cIjfXpz37Yj0DQmw';


//Place map
var map = L.mapbox.map('map', 'fma2.keb4h838').setView([40.78,-73.94], 11);


//Place markers
$(document).ready(function() {
  $.ajax({
    dataType: 'json',
    url: '/',
    type: 'GET'
  }).success(function(data) {  
      map.featureLayer.setGeoJSON(data);
    })
  });

//Add custom popups for each marker
map.featureLayer.on('layeradd', function(e) {
  marker = e.layer;
  properties = marker.feature.properties;
  popupContent = '<div class="popup">' + 
                  '<h3>' + properties.name + '</h3>' +
                  '<p>' + properties.address + ', ' + properties.zip + '</p>' +
                  '<p>Grades: '+ properties.grade_span_min + ' to ' + properties.grade_span_max + '</p>'
                     '<p>'+'</p>'
                  '<p>'+'</p>'
                  '<p>'+'</p>'

                  '</div>'
  marker.bindPopup(popupContent, {
    closeButton: false, 
    minWidth: 320
  });
})

//Add Marker list on right
var markerList = document.getElementById('marker-list');
map.featureLayer.on('layeradd', function(e) {
    map.featureLayer.eachLayer(function(layer) {
        var item = markerList.appendChild(document.createElement('li'));
        item.innerHTML = layer.toGeoJSON().properties.name;
        item.onclick = function() {
           map.setView(layer.getLatLng(), 14);
           layer.openPopup();
        };
    });
});

var output = document.getElementById('output');
// Initialize the geocoder control and add it to the map.
var geocoderControl = L.mapbox.geocoderControl('mapbox.places-v1');
geocoderControl.addTo(map);

// Listen for the `found` result and display the first result
// in the output container. For all available events, see
// https://www.mapbox.com/mapbox.js/api/v2.1.4/l-mapbox-geocodercontrol/#section-geocodercontrol-on
geocoderControl.on('found', function(res) {
    output.innerHTML = JSON.stringify(res.results.features[0]);
});

//Add MarkerClusterer
$(document).ready(function() {
  $.ajax({
    dataType: 'json',
    url: '/',
    type: 'GET'
  }).success(function(data) {  
      var markers = new L.MarkerClusterGroup();
      for (var i = 0; i< data.length; i++) {
        var schoolData = data[i], schoolProperties = schoolData.properties, title = schoolProperties.name;
        var popupContent = '<div class="popup">' + 
                  '<h3>' + schoolProperties.name + '</h3>' +
                  '<p>' + schoolProperties.address + ', ' + schoolProperties.zip + '</p>' +
                  '<p>Grades: '+ schoolProperties.grade_span_min + ' to ' + schoolProperties.grade_span_max + '</p>'
                     '<p>'+'</p>'
                  '<p>'+'</p>'
                  '<p>'+'</p>'

                  '</div>'
        var marker = L.marker(
          new L.LatLng(schoolData.geometry.coordinates[1], schoolData.geometry.coordinates[0]), {
          icon: L.mapbox.marker.icon({'marker-color': '0044FF'}),
          title: title,

        });
        marker.bindPopup(popupContent, {
          closeButton: false, 
          minWidth: 320
        });
        markers.addLayer(marker);
      }
      map.addLayer(markers)
    })
  });

//Filter sidebar
var newSchools = document.getElementById('filter-new-schools');
var consortiumSchools = document.getElementById('filter-consortium-schools');
var cteSchools = document.getElementById('filter-cte-schools');
var allGirlsSchools = document.getElementById('filter-all-girls-schools');
var internationalSchools = document.getElementById('filter-international-schools');
var specializedSchools = document.getElementById('filter-specialized-schools');
var nycPTechSchools = document.getElementById('filter-p-tech-schools');
var allBoysSchools = document.getElementById('filter-all-boys-schools');
var all = document.getElementById('filter-all');

newSchools.onclick = function(e) {
  consortiumSchools.className = '';
  cteSchools.className = '';
  allGirlsSchools.className = '';
  internationalSchools.className = '';
  specializedSchools.className = '';
  nycPTechSchools.className = '';
  allBoysSchools.className = '';
  all.className = '';

  this.className = 'active';
  // The setFilter function takes a GeoJSON feature object
  // and returns true to show it or false to hide it.
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'New School';
  });
  return false;
};

consortiumSchools.onclick = function(e) {
  newSchools.className = '';
  cteSchools.className = '';
  allGirlsSchools.className = '';
  internationalSchools.className = '';
  specializedSchools.className = '';
  nycPTechSchools.className = '';
  allBoysSchools.className = '';
  all.className = '';
  
  this.className = 'active';
  // The setFilter function takes a GeoJSON feature object
  // and returns true to show it or false to hide it.
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'Consortium School';
  });
  return false;
}

cteSchools.onclick = function(e) {
  newSchools.className = '';
  consortiumSchools.className = '';
  allGirlsSchools.className = '';
  internationalSchools.className = '';
  specializedSchools.className = '';
  nycPTechSchools.className = '';
  allBoysSchools.className = '';
  all.className = '';
  
  this.className = 'active';
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'CTE School';
  });
  return false;
}

allGirlsSchools.onclick = function(e) {
  newSchools.className = '';
  consortiumSchools.className = '';
  cteSchools.className = '';
  internationalSchools.className = '';
  specializedSchools.className = '';
  nycPTechSchools.className = '';
  allBoysSchools.className = '';
  all.className = '';
  
  this.className = 'active';
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'All-Girls School';
  });
  return false;
}

internationalSchools.onclick = function(e) {
  newSchools.className = '';
  consortiumSchools.className = '';
  cteSchools.className = '';
  allGirlsSchools.className = '';
  specializedSchools.className = '';
  nycPTechSchools.className = '';
  allBoysSchools.className = '';
  all.className = '';
  
  this.className = 'active';
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'International School';
  });
  return false;
}

specializedSchools.onclick = function(e) {
  newSchools.className = '';
  consortiumSchools.className = '';
  cteSchools.className = '';
  allGirlsSchools.className = '';
  internationalSchools.className = '';
  nycPTechSchools.className = '';
  allBoysSchools.className = '';
  all.className = '';
  
  this.className = 'active';
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'Specialized School';
  });
  return false;
}

nycPTechSchools.onclick = function(e) {
  newSchools.className = '';
  consortiumSchools.className = '';
  cteSchools.className = '';
  allGirlsSchools.className = '';
  internationalSchools.className = '';
  specializedSchools.className = '';
  allBoysSchools.className = '';
  all.className = '';
  
  this.className = 'active';
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'NYC P-Tech 9-14, New School';
  });
  return false;
}


allBoysSchools.onclick = function(e) {
  newSchools.className = '';
  consortiumSchools.className = '';
  cteSchools.className = '';
  allGirlsSchools.className = '';
  internationalSchools.className = '';
  specializedSchools.className = '';
  nycPTechSchools.className = '';
  all.className = '';
  
  this.className = 'active';
  map.featureLayer.setFilter(function(f) {
    return f.properties['type'] === 'All-Boys School';
  });
  return false;
}

all.onclick = function() {
  newSchools.className = '';
  consortiumSchools.className = '';
  cteSchools.className = '';
  allGirlsSchools.className = '';
  internationalSchools.className = '';
  specializedSchools.className = '';
  nycPTechSchools.className = '';
  allBoysSchools = '';
  this.className = 'active';
  map.featureLayer.setFilter(function(f) {
      // Returning true for all markers shows everything.
      return true;
  });
  return false;
};
