'use strict';
(function () {

  var photos = [];
  var arrayTotalNumbersUrl = [];

  var totalNumbers = window.MAX_PHOTO_URL - window.MIN_PHOTO_URL + 1; // считаем общее количество ссылок

  while (totalNumbers--) {
    arrayTotalNumbersUrl.push(totalNumbers + 1); // Создаем массив с числами по порядку
  }

  var getRandomArray = function (arr) { // создаем функцию для случайного тасования множества (Тасование Фишера — Йетса)
    var randomArr = arr.slice();
    for (var i = randomArr.length - 1; i > 0; i--) { // проходим по массиву в обратном порядке
      var j = Math.floor(Math.random() * i); // задаем случайный индекс от 0 до i
      var temp = randomArr[i]; // меняем местами каждый элемент со случайным элементом, который находится перед ним
      randomArr[i] = randomArr[j];
      randomArr[j] = temp;
    }
    return randomArr; // возвращаем перетасованный массив
  };

  var randomArrayUrl = getRandomArray(arrayTotalNumbersUrl);

  var getRandomArrayElement = function (arr) {
    var rand = Math.floor(Math.random() * arr.length);
    return arr[rand];
  };

  var getRandomNumber = function (min, max) {
    return Math.floor(min + Math.random() * (max - min));
  };

  var getRandomArrayComments = function (numberComments) {
    var comments = [];
    for (var i = 0; i < numberComments; i++) {
      comments[i] = {
        avatar: 'img/avatar-' + getRandomNumber(window.MIN_AVATAR_URL, window.MAX_AVATAR_URL) + '.svg',
        message: getRandomArrayElement(window.COMMENTS_MESSAGES),
        name: getRandomArrayElement(window.COMMENTS_NAMES)
      };
    }
    return comments;
  };

  var getRandomArrayPhoto = function (numberPhoto) {
    for (var i = 0; i < numberPhoto; i++) {
      photos[i] = {
        url: 'photos/' + randomArrayUrl[i] + '.jpg',
        description: getRandomArrayElement(window.COMMENTS_NAMES),
        likes: getRandomNumber(window.MIN_LIKES, window.MAX_LIKES),
        comments: getRandomArrayComments(getRandomNumber(window.MIN_COMMENTS, window.MAX_COMMENTS))
      };
    }
  };

  getRandomArrayPhoto(window.NUMBER_PHOTO);

  var similarListElement = document.querySelector('.pictures');
  var similarPhotoTemplate = document.querySelector('#picture')
      .content
      .querySelector('.picture');


  var renderPhoto = function (photo) {
    var photoElement = similarPhotoTemplate.cloneNode(true);

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return photoElement;
  };

  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPhoto(photos[i]));
  }

  similarListElement.appendChild(fragment);

})();
