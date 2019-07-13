// This example creates a triangular polygon with a hole in it.

const COLORS = ['#f87400', '#ff0000', '#00ff00', '#0000ff', '#526a00', '#526acd', '#b429cd'];

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 1.3521, lng: 103.8198},
    mapTypeId: 'roadmap'
  });

  direction = new Direction();
  var datapoints = direction.getDirection()['data'];
  console.log(datapoints);
  console.log('length', datapoints.length);

  var polygon = [];
  var flightPathArray = [];

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
    var flightPath = new google.maps.Polyline({
    path: flightPathArray[i],
    geodesic: true,
    strokeColor: COLORS[i % COLORS.length],
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
  }

  // let data = getx();
  // console.log(data['Latitude']);
  // console.log(data['Longitude']);

  // for (var i = 1; i < 20; i++) {
  //   flightPlanCoordinates.push({lat: data['Latitude'][i], lng: data['Longitude'][i]})
  // }

  // var flightPlanCoordinates = [
  //   {lat: data['Latitude'][1], lng: data['Longitude'][1]},
  //   {lat: data['Latitude'][2], lng: data['Longitude'][2]}
  // ];


  // polygon.setMap(map);
}