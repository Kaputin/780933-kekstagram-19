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

var totalNumbers = MAX_PHOTO_URL - MIN_PHOTO_URL + 1; // считаем общее количество ссылок

while (totalNumbers--) {
  arrayTotalNumbersUrl.push(totalNumbers + 1); // Создаем массив с числами по порядку
}

var getArrayRandomNumberUrl = function (arr) { // создаем функцию для случайного тасования множества (Тасование Фишера — Йетса)
  for (var i = arr.length - 1; i > 0; i--) { // проходим по массиву в обратном порядке
    var j = Math.floor(Math.random() * i); // задаем случайный индекс от 0 до i
    var temp = arr[i]; // меняем местами каждый элемент со случайным элементом, который находится перед ним
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arrayTotalNumbersUrl; // возвращаем перетасованный массив
};

getArrayRandomNumberUrl(arrayTotalNumbersUrl);

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
      url: 'photos/' + arrayTotalNumbersUrl[i] + '.jpg',
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

// --------------------------------Добавление фото и открытие, закрытие формы--------------------------------------------- //

var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var body = document.querySelector('body');
var uploadFile = document.querySelector('#upload-file');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var uploadCancel = document.querySelector('#upload-cancel');
var textDescription = document.querySelector('.text__description');
var textHashtags = document.querySelector('.text__hashtags');

var onPopupEscPress = function (evt) {
  if (textDescription === document.activeElement || textHashtags === document.activeElement) {
    return;
  } else if (evt.key === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  if (uploadFile.files.length > 0) {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    uploadCancel.addEventListener('click', onClosePopupClick);
    uploadCancel.addEventListener('keydown', onClosePopupKeydown);
    uploadFile.removeEventListener('change', onOpenPopupClick);
    previewImg.className = 'effects__preview--none'; // убираю эффект при открытии, т.к. при закрытии он оставляет последний
    effectLevel.hidden = true; // т.к. отрытие идет без эффекта убираю ползунок при открытии, потом при разбивке сделаю функцию отдельную
  }
};

var onOpenPopupClick = function () {
  openPopup();
};

var onOpenPopupKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
};

var closePopup = function () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFile.removeEventListener('change', onOpenPopupClick);
  uploadFile.removeEventListener('change', onOpenPopupKeydown);
  uploadFile.addEventListener('change', onOpenPopupClick);
  uploadCancel.removeEventListener('click', onClosePopupClick);
  uploadCancel.removeEventListener('keydown', onClosePopupKeydown);
  uploadFile.value = null;
};

var onClosePopupClick = function () {
  closePopup();
};

var onClosePopupKeydown = function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
};

uploadFile.addEventListener('change', onOpenPopupClick);

uploadFile.addEventListener('change', onOpenPopupKeydown);

// --------------Ползунок+стили-------------------- //
var effectLevel = document.querySelector('.effect-level');
var effectList = document.querySelector('.effects__list');
var previewImg = document.querySelector('.img-upload__preview img');
var effectLevelPin = document.querySelector('.effect-level__pin');
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelValue = document.querySelector('.effect-level__value');

// --------------Перемещение ползунка-------------------- //
effectLevelPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
  };
  var dragged = false;
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();
    dragged = true;
    var shift = {
      x: startCoords.x - moveEvt.clientX,
    };
    startCoords = {
      x: moveEvt.clientX,
    };

    var minPin = 0;
    var maxPin = 450;

    var movingPinAndDepth = (effectLevelPin.offsetLeft - shift.x);
    if (movingPinAndDepth < minPin) {
      effectLevelPin.style.left = minPin + 'px';
      effectLevelDepth.style.width = effectLevelPin.style.left;
      effectLevelValue.value = 0;
    } else {
      if (movingPinAndDepth > maxPin) {
        effectLevelPin.style.left = maxPin + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelDepth.style.width = effectLevelPin.style.left;
        effectLevelValue.value = Math.floor((effectLevelPin.offsetLeft - shift.x) / 4.5);
      }
    }
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    if (dragged) {
      var onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        effectLevelPin.removeEventListener('click', onClickPreventDefault);
      };
      effectLevelPin.addEventListener('click', onClickPreventDefault);
    }

    if (previewImg.className === 'effects__preview--chrome') {
      previewImg.style.filter = 'grayscale(1)';
      previewImg.style.filter = 'grayscale(' + effectLevelValue.value / 100 + ')';
    } else {
      if (previewImg.className === 'effects__preview--sepia') {
        previewImg.style.filter = 'sepia(1)';
        previewImg.style.filter = 'sepia(' + effectLevelValue.value / 100 + ')';
      } else {
        if (previewImg.className === 'effects__preview--marvin') {
          previewImg.style.filter = 'invert(100%)';
          previewImg.style.filter = 'invert(' + effectLevelValue.value + '%)';
        } else {
          if (previewImg.className === 'effects__preview--phobos') {
            previewImg.style.filter = 'blur(3px)';
            previewImg.style.filter = 'blur(' + 3 * effectLevelValue.value / 100 + 'px)';
          } else {
            if (previewImg.className === 'effects__preview--heat') {
              previewImg.style.filter = 'brightness(3)';
              previewImg.style.filter = 'brightness(' + (1 + 2 * effectLevelValue.value / 100) + ')';
            }
          }
        }
      }
    }
  };

  document.addEventListener('mousemove', onMouseMove); // навесил на документ, что перемещать откинув мышь

  document.addEventListener('mouseup', onMouseUp); // навесил на документ, что перемещать откинув мышь
});

// ------------------------------ Смена фильтров и возврат к стандартному значению 100 -----------------//
var filterChangeHandler = function (evt) {
  if (evt.target) {
    previewImg.className = 'effects__preview--' + evt.target.value;
    if (previewImg.className !== 'effects__preview--none') {
      effectLevel.hidden = false;
      effectLevelValue.value = 100;
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      if (previewImg.className === 'effects__preview--chrome') {
        previewImg.style.filter = 'grayscale(1)';
      } else {
        if (previewImg.className === 'effects__preview--sepia') {
          previewImg.style.filter = 'sepia(1)';
        } else {
          if (previewImg.className === 'effects__preview--marvin') {
            previewImg.style.filter = 'invert(100%)';
          } else {
            if (previewImg.className === 'effects__preview--phobos') {
              previewImg.style.filter = 'blur(3px)';
            } else {
              if (previewImg.className === 'effects__preview--heat') {
                previewImg.style.filter = 'brightness(3)';
              }
            }
          }
        }
      }
    } else {
      effectLevel.hidden = true;
      effectLevelValue.value = 20;
      effectLevelPin.style.left = '20%';
      effectLevelDepth.style.width = '20%';
    }
  }
};

effectList.addEventListener('change', filterChangeHandler);


// --------------Валидация (не проверил все варианты, нашел косяки)-------------------- //

var hasRepeatingHashtags = function (arrHashtags) {
  arrHashtags.sort();
  for (var j = 0; j < arrHashtags.length - 1; j++) {
    if (arrHashtags[j] === arrHashtags[j + 1]) {
      return true;
    }
  }
  return false;
};
var submit = document.querySelector('#upload-submit');


var onCheckHashtag = function () {
  var target = textHashtags;
  if (target.value === '') {
    return;
  } else {
    var hashtagsList = target.value.toLowerCase().split(' ');
    for (var h = 0; h < hashtagsList.length; h++) {
      if (hashtagsList[h][0] !== '#') {
        target.setCustomValidity(
            'Хэш-тег должен начинаться с символа # (решётка)'
        );
      } else if (hashtagsList[h].length === 1 && hashtagsList[h][0] === '#') {
        target.setCustomValidity(
            'Хеш-тег не должен состоять только из одной решётки'
        );
      } else if (hashtagsList[h].length > 20) {
        target.setCustomValidity(
            'Максимальная длина одного хэш-тега не должна превышать 20 символов, включая решётку'
        );
      } else if (hashtagsList[h].split('#').length > 2) {
        target.setCustomValidity(
            'Хеш-теги должны разделяться пробелами'
        );
      } else if (hasRepeatingHashtags(hashtagsList)) { // indexOf находит сам себя, задавал двумя промежутками пока еще не разобрался. чуть позже переделаю
        target.setCustomValidity(
            'Один и тот же хэш-тег не может быть использован дважды'
        );
      } else if (hashtagsList.length > 5) {
        target.setCustomValidity(
            'Нельзя указать больше пяти хэш-тегов'
        );
      } else {
        target.setCustomValidity('');
      }
    }
  }
};

submit.addEventListener('click', onCheckHashtag);

submit.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    onCheckHashtag();
  }
});
