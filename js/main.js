var $filmsList = document.querySelector('#films-list');
var $detailsInfo = document.querySelector('#details-page');
var $list = document.querySelector('#list2');

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
    $filmsList.addEventListener('click', handleImg);
  }
});

xhr.send();

var $filmInfo = document.querySelector('.film-info');

function handleImg(event) {
  if (event.target.tagName === 'IMG') {
    $list.className = 'hidden';
    $detailsInfo.className = '';
    var filmId = event.target.getAttribute('data-film-index');
    var filmInfoTree = createDetailsPage(data.films[filmId]);
    $filmInfo.appendChild(filmInfoTree);
  }
}

function removeChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChildNodes(parent.firstChild);
  }
}

function createDetailsPage(film) {
  var $detailsContainer = document.createElement('div');
  var titleMovie = document.createElement('h2');
  titleMovie.textContent = film.title + ' ' + '(' + film.original_title + ')';
  titleMovie.setAttribute('class', 'row');
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
  $list.className = '';

  if (event.target) {
    removeChildNodes($filmInfo);
  }
}
