// This example requires the Visualization library. Include the libraries=visualization
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization">

var flightPathArray = [];
var mappedPathArray = [];
var startMarkerArray = [];
var endMarkerArray = [];
var flightPath;
var map, heatmap;
var busHtml = '';
const COLORS = ['#f87400', '#ff0000', '#00ff00', '#0000ff', '#526a00', '#526acd', '#b429cd'];

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

  direction = new Direction();
  var datapoints = direction.getDirection()['data'];
  console.log(datapoints);
  console.log('length', datapoints.length);

  var polygon = [];

  for (var j = 0; j < datapoints.length; j++) {
    // plot the start and the end location
    var temp = [];
    main = datapoints[j];
    for (var i=0; i < main.length; i++) {
      // temp.push({lat:main[i]['routes'][0]['legs'][0]['start_location']['lat'], lng: main[i]['routes'][0]['legs'][0]['start_location']['lng']}),
      temp.push(new google.maps.LatLng(main[i]['routes'][0]['legs'][0]['start_location']['lat'], main[i]['routes'][0]['legs'][0]['start_location']['lng'])),
      // temp.push({lat:main[i]['routes'][0]['legs'][0]['end_location']['lat'], lng: main[i]['routes'][0]['legs'][0]['end_location']['lng']})
      temp.push(new google.maps.LatLng(main[i]['routes'][0]['legs'][0]['end_location']['lat'], main[i]['routes'][0]['legs'][0]['end_location']['lng']))
    }

    flightPathArray.push(temp)
  }

  for (let i = 0; i < flightPathArray.length; i++) {
    flightPath = new google.maps.Polyline({
    path: flightPathArray[i],
    geodesic: true,
    strokeColor: COLORS[i % COLORS.length],
    strokeOpacity: 1.0,
    strokeWeight: 4
    });
    mappedPathArray.push(flightPath);
    var startMarker = new google.maps.Marker({
          position:flightPath.getPath().getAt(0), 
          map:map,
          icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#F9f9f9",
              fillOpacity: 1,
              strokeWeight: 0.4
          },
        });
    var endMarker =  new google.maps.Marker({
          position:flightPath.getPath().getAt(flightPath.getPath().getLength()-1), 
          map:map,
          icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#F9f9f9",
              fillOpacity: 1,
              strokeWeight: 0.4
          },
        });

    startMarkerArray.push(startMarker);
    endMarkerArray.push(endMarker);
    flightPath.setMap(map);
  }
  for (let i = 0; i < mappedPathArray.length; i++) {
    busHtml += '<li class="collection-item" style="border-left: 8px ' + COLORS[i % COLORS.length] + ' solid;" id='+ i +' onClick="clickedBus(this.id)">Bus ' + (i + 1) + '</li>';
  }
  document.getElementById("collapsibleInsert").innerHTML = busHtml;
}

function toggleHeatmap() {
  heatmap.setMap(heatmap.getMap() ? null : map);
}

function clickedBus(item) {
  console.log(item)
  console.log(parseInt(item))
  for(var i = 0; i < mappedPathArray.length; i++) {
    if (i == parseInt(item)) {}
    else {
     mappedPathArray[i].setMap(mappedPathArray[i].getMap() ? null : map);
    }
  }
  for(var i = 0; i < startMarkerArray.length; i++) {
    if (i == parseInt(item)) {}
    else {
       startMarkerArray[i].setMap(startMarkerArray[i].getMap() ? null : map);
       endMarkerArray[i].setMap(endMarkerArray[i].getMap() ? null : map);
    }
  }
}

function toggleRoutes() {
  for(var i = 0; i < mappedPathArray.length; i++) {
         mappedPathArray[i].setMap(mappedPathArray[i].getMap() ? null : map);
  }
  for(var i = 0; i < startMarkerArray.length; i++) {
         startMarkerArray[i].setMap(startMarkerArray[i].getMap() ? null : map);
         endMarkerArray[i].setMap(endMarkerArray[i].getMap() ? null : map);
  }
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
  $('.scrollspy').scrollSpy({scrollOffset: 0});
});

$(document).ready(function(){
  $('.pushpin').pushpin();
});

$(document).ready(function(){
  $('#pinned').pushpin({ top: $('#pinned').offset().top, bottom: 3200 });
});
