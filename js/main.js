var $filmsList = document.querySelector('.films-list');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://ghibliapi.herokuapp.com/films');
xhr.responseType = 'json';
xhr.addEventListener('load', function () {
  for (var i = 0; i < xhr.response.length; i++) {
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
  }
});

xhr.send();
