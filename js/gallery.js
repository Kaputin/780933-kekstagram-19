'use strict';
(function () {
  // ЧТО ДЕЛАТЬ С КОДОМ КОТОРЫЙ БОЛЬШЕ НЕ БУДЕМ ИСПОЛЬЗОВАТЬ?? ПОКА ОСТАВИТЬ??


  // var photos = [];
  // var arrayTotalNumbersUrl = [];
  //
  // var totalNumbers = window.data.MAX_PHOTO_URL - window.data.MIN_PHOTO_URL + 1; // считаем общее количество ссылок
  //
  // while (totalNumbers--) {
  //   arrayTotalNumbersUrl.push(totalNumbers + 1); // Создаем массив с числами по порядку
  // }
  //
  // var randomArrayUrl = window.getRandomArray(arrayTotalNumbersUrl);
  //
  // var getRandomArrayComments = function (numberComments) {
  //   var comments = [];
  //   for (var i = 0; i < numberComments; i++) {
  //     comments[i] = {
  //       avatar: 'img/avatar-' + window.getRandomNumber(window.data.MIN_AVATAR_URL, window.data.MAX_AVATAR_URL) + '.svg',
  //       message: window.getRandomArrayElement(window.data.COMMENTS_MESSAGES),
  //       name: window.getRandomArrayElement(window.data.COMMENTS_NAMES)
  //     };
  //   }
  //   return comments;
  // };
  //
  // var getRandomArrayPhoto = function (numberPhoto) {
  //   for (var i = 0; i < numberPhoto; i++) {
  //     photos[i] = {
  //       url: 'photos/' + randomArrayUrl[i] + '.jpg',
  //       description: window.getRandomArrayElement(window.data.COMMENTS_NAMES),
  //       likes: window.getRandomNumber(window.data.MIN_LIKES, window.data.MAX_LIKES),
  //       comments: getRandomArrayComments(window.getRandomNumber(window.data.MIN_COMMENTS, window.data.MAX_COMMENTS))
  //     };
  //   }
  // };
  //
  // getRandomArrayPhoto(window.data.NUMBER_PHOTO);

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

  // var fragment = document.createDocumentFragment();
  // for (var i = 0; i < photos.length; i++) {
  //   fragment.appendChild(renderPhoto(photos[i]));
  // }
  //
  // similarListElement.appendChild(fragment);

  var onSuccess = function (photos) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 25; i++) {
      fragment.appendChild(renderPhoto(photos[i]));
    }
    similarListElement.appendChild(fragment);
  };

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backendLoad(onSuccess, onError);

})();
