function busstop() {
  fetch('/busstop')
    .then(function(response) {
      return response.json();
    });
}
