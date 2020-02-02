'use strict';

var COMMENTS_MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var COMMENTS_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var photos = [];
var numberPhoto = 25;
var minPhotoUrl = 1;
var maxPhotoUrl = 25;
var minAvatarUrl = 1;
var maxAvatarUrl = 6;
var minLikes = 15;
var maxLikes = 200;
var comments = [];
var minComments = 0;
var maxComments = 20;

var getRandomArrayMember = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var getRandomNumber = function (min, max) {
  return Math.floor(min + Math.random() * (max - min));
};

var getRandomArrayComments = function (numberComments) {
  for (var i = 0; i < numberComments; i++) {
    comments [i] = {
      avatar: 'img/avatar-' + getRandomNumber(minAvatarUrl, maxAvatarUrl) + '.svg',
      message: getRandomArrayMember(COMMENTS_MESSAGES),
      name: getRandomArrayMember(COMMENTS_NAMES)
    };
  }
};

getRandomArrayComments(getRandomNumber(minComments, maxComments));

var getRandomArrayPhoto = function (number) {
  for (var i = 0; i < number; i++) {
    getRandomArrayComments(getRandomNumber(minComments, maxComments));// не работает, буду думать как переделать, чтобы на каждой итерации задавался новый массив с комментариями
    photos [i] = {
      url: 'photos/' + getRandomNumber(minPhotoUrl, maxPhotoUrl) + '.jpg', // число случайное, но пока повторяется, тоже буду менять
      description: getRandomArrayMember(COMMENTS_NAMES),
      likes: getRandomNumber(minLikes, maxLikes),
      comments: comments
    };
  }
};

getRandomArrayPhoto(numberPhoto);

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
