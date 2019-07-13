function getx(){
  var value
  $.ajax({
      type: "POST",
      url: "/busstop",
      async: false,
  })
  .done(function(data) {
    value = data
  })
  return value
} 
