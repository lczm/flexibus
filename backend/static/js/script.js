// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var map, heatmap;

// Heatmap data: 500 Points
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 1.3521, lng: 103.8198},
    mapTypeId: 'roadmap'
  });

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: getPoints(),
    map: map
  });
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
  var gradient = [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ]
  heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
  heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
  heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

function getPoints() {
  // busstop().then(data => console.log(data))
  let data = getx();
  console.log(data['Latitude']);
  console.log(data['Longitude']);
  console.log(data['Weight']);
 
  var dataList = [];
  for (var i = 1; i < data["Latitude"].length; i++) {
    pos = new google.maps.LatLng(parseFloat(data["Latitude"][i]).toFixed(4), parseFloat(data["Longitude"][i]).toFixed(4), data["Weight"][i]);
    dataList.push(pos);
  }
  return dataList;
}

$(document).ready(function(){
  $('ul.tabs').tabs();
});

$(document).ready(function(){
  $('ul.tabs').tabs('select_tab', 'tab_id');
});

$(document).ready(function(){
  $('.scrollspy').scrollSpy();
});

$(document).ready(function(){
  $('.pushpin').pushpin();
});

$(document).ready(function(){
  $('#pinned').pushpin({ top: $('#pinned').offset().top, bottom: 1700 });
});
