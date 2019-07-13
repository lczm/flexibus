class Direction {
  constructor() {
    this.baseurl = "https://maps.googleapis.com/maps/api/directions/json?"
    this.key = "AIzaSyA63GKyT88PRUP9Gp10HFuJwWeAWxBgu-c"
    this.url = ""
  }

  makeURL() {
    let url = this.baseurl;
    // add parameters
    url = url + "origin=Disneyland&destination=Universal+Studios+Hollywood"
    // add key
    url = url + "&key=" + this.key
    this.url = url;
  }

  getDirection() {
    var return_data;
    $.ajax({
      type: "GET",
      url : "/cors",
      async: false,
    }).done(function(data) {
      // plot these points out on the graph
      // console.log(data['routes'][0]['legs'][0]['start_location'])
      // console.log(data['routes'][0]['legs'][0]['end_location'])
      console.log(data);
      return_data = data;
    })
    return return_data;
  }

}

// direction = new Direction()
// direction.makeURL()
// direction.getDirection();
