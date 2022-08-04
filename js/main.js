var $filmsList = document.querySelector('#films-list');
var $detailsInfo = document.querySelector('#details-page');
var $list = document.querySelector('#list2');
var $reviewPage = document.querySelector('#review-page');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://ghibliapi.herokuapp.com/films');
xhr.responseType = 'json';

xhr.addEventListener('load', function () {
  data.films = xhr.response;
  for (var i = 0; i < data.films.length; i++) {
    var $divElement = document.createElement('div');
    $divElement.setAttribute('class', 'margin-top-bottom width-img-container');
    $filmsList.appendChild($divElement);
    var $divP = document.createElement('div');
    $divElement.appendChild($divP);
    var $filmTitle = document.createElement('p');
    $filmTitle.textContent = xhr.response[i].title;
    $divP.appendChild($filmTitle);
    var $img = document.createElement('img');
    $img.setAttribute('src', xhr.response[i].image);
    $divElement.appendChild($img);
    $divP.setAttribute('class', 'container-green');
    $filmTitle.setAttribute('class', 'text-p');
    $img.setAttribute('data-film-index', i);
    $img.setAttribute('id', 'film-img');
    $list.addEventListener('click', handleImg);
    $addReviewButton.addEventListener('click', reviewButton);
  }
});

xhr.send();

var $filmInfo = document.querySelector('.film-info');

function handleImg(event) {
  if (event.target.tagName === 'IMG') {
    $list.className = 'hidden';
    $detailsInfo.className = '';
    $reviewPage.className = 'hidden';
    $noReviews.className = 'hidden';

    var filmId = event.target.getAttribute('data-film-index');
    var filmInfoTree = createDetailsPage(data.films[filmId]);
    $filmInfo.appendChild(filmInfoTree);
  }
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createDetailsPage(film) {
  var $detailsContainer = document.createElement('div');
  var titleMovie = document.createElement('h2');
  titleMovie.textContent = film.title + ' ' + '(' + film.original_title + ')';
  titleMovie.setAttribute('class', 'row');
  titleMovie.setAttribute('id', 'film-title');
  $detailsContainer.appendChild(titleMovie);

  var $ImgInfo = document.createElement('img');
  $ImgInfo.setAttribute('src', film.movie_banner);
  $ImgInfo.setAttribute('id', 'film-banner');
  $ImgInfo.setAttribute('class', 'column-two-thirds padding-between');

  var $box = document.createElement('div');
  $box.setAttribute('class', 'detail-box');

  var $ulElement = document.createElement('ul');
  $detailsContainer.appendChild($ulElement);

  var $liElement1 = document.createElement('li');
  $liElement1.textContent = 'Director: ' + film.director;
  $ulElement.appendChild($liElement1);

  var $liElement2 = document.createElement('li');
  $liElement2.textContent = 'Producer: ' + film.producer;
  $ulElement.appendChild($liElement2);

  var $liElement3 = document.createElement('li');
  $liElement3.textContent = 'Release date: ' + film.release_date;
  $ulElement.appendChild($liElement3);

  var $liElement4 = document.createElement('li');
  $liElement4.textContent = 'Running Time: ' + film.running_time + ' min';
  $ulElement.appendChild($liElement4);

  $box.appendChild($ulElement);

  var $divImgP = document.createElement('div');
  $divImgP.setAttribute('class', 'row justify-content');
  $divImgP.appendChild($ImgInfo);
  $divImgP.appendChild($box);
  $detailsContainer.appendChild($divImgP);

  var $pEelement = document.createElement('p');
  $pEelement.textContent = film.description;
  $detailsContainer.appendChild($pEelement);
  $pEelement.setAttribute('class', 'taviraj row');

  return $detailsContainer;
}

var $back = document.querySelector('.back');
$back.addEventListener('click', returnList);

function returnList(event) {
  $detailsInfo.className = 'hidden';
  $list.className = 'row';
  $reviewPage.className = 'hidden';

  if (event.target) {
    removeChildNodes($filmInfo);
  }
}

var $StudioGhlibiTab = document.querySelector('#studios-ghibli-tab');
$StudioGhlibiTab.addEventListener('click', function (event) {
  $list.className = '';
  $detailsInfo.className = 'hidden';
  $reviewPage.className = 'hidden';

  if (event.target) {
    removeChildNodes($filmInfo);
  }
});

var $reviewTab = document.querySelector('#tab-reviews');
var $reviewsList = document.querySelector('#reviews-list');

$reviewTab.addEventListener('click', function (event) {
  $list.className = 'hidden';
  $detailsInfo.className = 'hidden';

  if (data.reviews.length === 0) {
    $reviewsList.className = '';
    $noReviews.className = 'text-center';
    $reviewPage.className = '';
    $newReview.className = 'hidden';

  } else {
    data.view = 'review-list';
    $reviewPage.className = '';
    $newReview.className = 'hidden';
    $reviewsList.className = '';
    $noReviews.className = 'hidden';

  }

  if (event.target) {
    removeChildNodes($filmInfo);
  }
});

var $noReviews = document.querySelector('.no-reviews');
var $newReview = document.querySelector('#add-review');
var $addReviewButton = document.querySelector('.add-review-button');

function reviewButton(event) {
  $noReviews.classList.add('hidden');
  $newReview.className = '';
  $reviewPage.className = '';
  $reviewsList.className = 'hidden';
  $list.className = 'hidden';
  $detailsInfo.className = 'hidden';

  var $reviewFilm = document.querySelector('.review-film');
  var $reviewImg = document.querySelector('.review-img');

  $reviewFilm.textContent = document.querySelector('#film-title').textContent;
  $reviewImg.setAttribute('src', document.querySelector('#film-banner').src);
}

var $form = document.querySelector('form');
var $ulElement2 = document.querySelector('ul');

$form.addEventListener('submit', submitReview);

function submitReview(event) {
  event.preventDefault();
  var review = {};
  review = {
    title: document.querySelector('#film-title').textContent,
    img: document.querySelector('#film-banner').src,
    textReview: $form.elements[0].value,
    reviewId: data.nextReviewId
  };

  data.nextReviewId++;
  data.reviews.unshift(review);
  $ulElement2.prepend(createReviewList(review));
  $form.reset();

  $list.className = 'hidden';
  $reviewsList.className = '';
  $reviewPage.className = '';
  $detailsInfo.className = 'hidden';
  $noReviews.className = 'text-center hidden';
  $newReview.className = 'hidden';
  data.view = 'reviews-list';
}

function createReviewList(review) {
  var $liElement = document.createElement('li');
  $liElement.setAttribute('data-review-id', review.reviewId);
  $liElement.setAttribute('class', 'marginli');

  var $titleElement = document.createElement('h2');
  $titleElement.textContent = review.title;
  $titleElement.setAttribute('class', 'row');
  $titleElement.setAttribute('id', 'h2-reviews');
  $liElement.appendChild($titleElement);

  var $ImgElement = document.createElement('img');
  $ImgElement.setAttribute('src', review.img);
  $ImgElement.setAttribute('id', 'film-banner');
  $ImgElement.setAttribute('class', 'banner-width');
  $liElement.appendChild($ImgElement);

  var $pElement = document.createElement('p');
  $pElement.textContent = review.textReview;
  $pElement.setAttribute('id', 'p-reviews');
  $liElement.appendChild($pElement);

  return $liElement;
}

var $yourReviewsList = document.querySelector('.your-reviews-list');

document.addEventListener('DOMContentLoaded', function (event) {
  for (var i = 0; i < data.reviews.length; i++) {
    var reviewResult = createReviewList(data.reviews[i]);
    $yourReviewsList.appendChild(reviewResult);
  }
});
