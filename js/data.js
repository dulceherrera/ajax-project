/* exported data */
var data = {
  view: 'list',
  films: [],
  reviews: [],
  nextReviewId: 1,
  editing: null
};

var previousData = localStorage.getItem('studios-ghibli-tab');
if (previousData !== null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  var reviewsJSON = JSON.stringify(data);
  localStorage.setItem('studios-ghibli-tab', reviewsJSON);
});
