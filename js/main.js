'use strict';

var COMMENTS_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var COMMENTS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var NUMBER_PHOTO = 25;
var MIN_PHOTO_URL = 1;
var MAX_PHOTO_URL = 25;
var MIN_AVATAR_URL = 1;
var MAX_AVATAR_URL = 6;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_COMMENTS = 0;
var MAX_COMMENTS = 20;
var photos = [];
var arrayTotalNumbersUrl = [];
var arrayRandomNumbersUrl = [];

var getArrayRandomNumberUrl = function (min, max) {
  var tempRandomNumber;
  var totalNumbers = max - min + 1;
  while (totalNumbers--) {
    arrayTotalNumbersUrl.push(totalNumbers + min);
  }
  while (arrayTotalNumbersUrl.length) {
    tempRandomNumber = Math.round(Math.random() * (arrayTotalNumbersUrl.length - 1));
    arrayRandomNumbersUrl.push(arrayTotalNumbersUrl[tempRandomNumber]);
    arrayTotalNumbersUrl.splice(tempRandomNumber, 1);
  }
  return arrayRandomNumbersUrl;
};

getArrayRandomNumberUrl(MIN_PHOTO_URL, MAX_PHOTO_URL);

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
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_URL, MAX_AVATAR_URL) + '.svg',
      message: getRandomArrayElement(COMMENTS_MESSAGES),
      name: getRandomArrayElement(COMMENTS_NAMES)
    };
  }
  return comments;
};

var getRandomArrayPhoto = function (numberPhoto) {
  for (var i = 0; i < numberPhoto; i++) {
    photos[i] = {
      url: 'photos/' + arrayRandomNumbersUrl[i] + '.jpg',
      description: getRandomArrayElement(COMMENTS_NAMES),
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: getRandomArrayComments(getRandomNumber(MIN_COMMENTS, MAX_COMMENTS))
    };
  }
};

getRandomArrayPhoto(NUMBER_PHOTO);

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
