//Add modal content with Foundation
function addModalContent(marker) {
  var properties = marker.feature.properties
  var programs = properties.programs
  var modal = 
  '<div id="modal' + properties.dbn + '" class="reveal-modal" data-reveal>' +
  '<div id="modal-map"></div>' +
  '<h3 class="title fancy">' + properties.name + '</h3>' +
  '<dl class="tabs" id="modalTabs" data-tab>' +
  '<dd class="top" id="overview-tab"><a href="#overview"><h3>overview</h3></a></dd>' +
  '<dd class="top" id="details-tab"><a href="#details"><h3>details</h3></a></dd>' +
  '<dd class="top" id="programs-tab"><a href="#programs"><h3>special programs</h3></a></dd>' +
  '<dd class="top" id="performance-tab"><a href="#performance"><h3>performance</h3></a></dd>' +
  '</dl>' +
  '<section class="information">' +
  '<div class="tabs-content">' +
    '<div class="content" id="overview">' +
      ''+addOverviewToModal(properties)+'' +
    '</div>' +
    '<div class="content" id="details">' +  
      ''+addDetailsToModal(properties)+'' +  //add information on schools' programs here
    '</div>' +
    '<div class="content" id="programs">' +
      ''+addProgramsToModal(properties.programs)+'' + //add information on schools' programs here
    '</div>' +
    '<div class="content" id="performance">' +
      ''+addPerformanceToModal(properties)+'' + //add information on schools' performance here
    '</div>' +
  '</div>' +
  '<a class="close-reveal-modal">&#215;</a>'+
  '</div>'

  $("body").append(modal);
  var modalId = '#modal' + properties.dbn;
  $(document).foundation('tab', 'reflow');
  // $('a.reveal-link').trigger('click');
  // $('a.close-reveal-modal').trigger('click');
  $(modalId).foundation('reveal', 'close', {})
  $(document).on('closed.fndtn.reveal', '[data-reveal]', function () {
  // var modal = $(this);
  // console.log(modal.context);
   // $(document).foundation('reflow');
   // console.log($('dd.top'));
  // ('dd.top').removeClass('active');
  // ('dd.content').removeClass('active');
  });
}

function addOverviewToModal(properties) {
  var overview = '<p class="address">' + properties.address  + ' | ' +  properties.boro + '</p>' +
  '<p class="contact"><span class="phone-number">' + properties.phone + '</span>' + ' | ' +'<span class="website"><a target="_blank" href="http://' + properties.website + '">website</a></span>' +
  '<p class="grades">Grades ' + properties.grade_span_min + ' to ' + properties.grade_span_max + '</p>' +
  '<p class="type">' + properties.type + '</p>' +
  '<p class=program-highlights>' + properties.program_highlights + '</p>';
  return overview
}

function addDetailsToModal(properties) {
  var details =
  '<p class="dbn">' + properties.dbn + '</p>' +
  '<p class"type">' + properties.type + '</p>' +
  '<p>' + properties.grade_span_min + ' to ' + properties.grade_span_max + '</p>' +
  '<p>' + properties.total_students + '</p>' +
  '<p>' + properties.overview_paragraph + '</p>' +
  '<p>' + properties.extracurricular_activities + '</p>' +
  '<p>' + properties.se_services + '</p>'; 
  return details;
}

function addProgramsToModal(programsData) {
  var programs = [];
  for (i=0; i< programsData.length; i++) {
    programs.push('<h2 class="program-title">' + programsData[i].program_name + '</h2>' +
      '<p class="program-interest-area">' + programsData[i].interest_area + '</p>' +
      '<p class="program-selection-method">'+ programsData[i].selection_method + '</p>' +
      '<p class="program-url">' + programsData[i].urls + '</p>')
  }
  if (programs === []) {
    return'<p>No special programs</p>';
  } else {
    return programs;    
  }
}

function addPerformanceToModal(properties) {
  return '<p>This feature is coming soon!</p>';
}