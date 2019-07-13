// This example creates a triangular polygon with a hole in it.

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: {lat: 1.3521, lng: 103.8198},
    mapTypeId: 'roadmap'
  });

  direction = new Direction();
  datapoints = direction.getDirection()['data'];
  console.log(datapoints);

  var flightPlanCoordinates = [];

  for (var j = 0; j < datapoints.length; j++) {
    // plot the start and the end location
    main = datapoints[j]['routes'][0]['legs'][0]
    console.log(main['steps'].length);
    if( main['steps'].length > 0) {
      for (var i=0; i < main['steps'].length; i++) {
        flightPlanCoordinates.push({lat:main['steps'][i]['start_location']['lat'], lng: main['steps'][i]['start_location']['lng']})
        flightPlanCoordinates.push({lat:main['steps'][i]['end_location']['lat'], lng: main['steps'][i]['end_location']['lng']})
      }
    }
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

  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  flightPath.setMap(map);
}
