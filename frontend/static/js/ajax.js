function upvote(id) {
  fetch('/busstop', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .then(function(response) {
    points.innerText = response['id']
  }).catch(function(err) {
    console.log('error', err);
  })
}
