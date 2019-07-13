// This example creates a triangular polygon with a hole in it.

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

  for (var j = 0; j < datapoints.length; j++) {
    // plot the start and the end location
    var temp = [];
    main = datapoints[j]
    if(main.length > 0) {
      for (var i=0; i < main.length; i++) {
        // temp.push({lat:main[i]['routes'][0]['legs'][0]['start_location']['lat'], lng: main[i]['routes'][0]['legs'][0]['start_location']['lng']}),
        temp.push(new google.maps.LatLng(main[i]['routes'][0]['legs'][0]['start_location']['lat'], main[i]['routes'][0]['legs'][0]['start_location']['lng'])),
        // temp.push({lat:main[i]['routes'][0]['legs'][0]['end_location']['lat'], lng: main[i]['routes'][0]['legs'][0]['end_location']['lng']})
        temp.push(new google.maps.LatLng(main[i]['routes'][0]['legs'][0]['end_location']['lat'], main[i]['routes'][0]['legs'][0]['end_location']['lng']))
      }
    }
    // flightPlanCoordinates.push(temp);
    polygon.push(new google.maps.Polyline({
      path: temp,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    }));
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

//   var flightPath = new google.maps.Polyline({
//     path: flightPlanCoordinates,
//     geodesic: true,
//     strokeColor: '#FF0000',
//     strokeOpacity: 1.0,
//     strokeWeight: 2
//   });

  // flightPath.setMap(map);
  // polygon.setMap(map);
  map.fitBounds(bounds);
}
