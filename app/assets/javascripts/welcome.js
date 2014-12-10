
// google.load("visualization", "1", {packages:["corechart"]});
// google.setOnLoadCallback(drawChart);
// function drawChart() {
//   var programsArr = prepareProgramsCount(countPrograms(gon.programs))
//   var data = google.visualization.arrayToDataTable(programsArr);

//   var options = {
//     legend: 'none',
//     slices: { 4: {offset: 0.2},
//               11: {offset: 0.3},
//               14: {offset: 0.4},
//               15: {offset: 0.5},
//             }
//   }

//   var chart = new google.visualization.PieChart(document.getElementById('piechart'));

//   chart.draw(data, options);
// }

// function countPrograms(data) {
//   var programsCount = {}
//   for (i=0; i < data.length; i++) {
//     var interest_area = data[i].interest_area;
//     programsCount[interest_area] = 0 ;
//   }
//   for (i=0; i < data.length; i++) {
//     var interest_area = data[i].interest_area;
//     programsCount[interest_area] +=  1 ;
//   }
//   return programsCount
// }

// function prepareProgramsCount(hsh) {
//   var programsArr = new Array()
//   programsArr.push(['Task', 'Hours per Day'])
//   for (var k in hsh) {
//     programsArr.push([k, hsh[k]]);
//   }
//   return programsArr
// }



