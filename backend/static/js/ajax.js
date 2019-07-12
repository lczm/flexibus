function getx() {
  $.ajax({
  url: "test.html",
  context: document.body
  }).done(function() {
    console.log('done')
  });
}
