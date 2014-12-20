var programsButton = document.getElementById('programsToggle');
programsButton.onclick = function(e) {
  $.ajax({
    dataType: 'json',
    url: '/programs',
    type: 'GET'
  }).success(function(data) {
    var featureLayer = L.mapbox.featureLayer(data)
    var clusterGroup = new L.MarkerClusterGroup();
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
      '<p>Program Name: ' + properties.program_name + '</p>' +
      '</div>'
      marker.bindPopup(popupContent, {
        closeButton: false,
        minWidth: 320
      });
      var feature = marker.feature
    })
  });
}