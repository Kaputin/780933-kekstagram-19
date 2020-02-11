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

// сказали упростить данную функцию, задать массив и просто его перемешать, а затем из него брать подряд элементы? или как лучше реализовать, здесь делал - думал может еще где пригодится
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
  }
};

uploadFile.addEventListener('change', openPopup);

uploadFile.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

var closePopup = function () {
  body.classList.remove('modal-open');
  imgUploadOverlay.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  uploadFile.value = null;
};

uploadFile.removeEventListener('change', closePopup);

uploadFile.removeEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

uploadCancel.addEventListener('click', function () {
  closePopup();
});

uploadCancel.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
});

uploadCancel.removeEventListener('click', openPopup);

uploadCancel.removeEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});

// --------------Ползунок-------------------- //

var effectList = document.querySelector('.effects__list');
var previewImg = document.querySelector('.img-upload__preview img');

var filterChangeHandler = function (evt) {
  if (evt.target) {
    previewImg.className = 'effects__preview--' + evt.target.value;
  }
};

effectList.addEventListener('change', filterChangeHandler);

// --------------Валидация-------------------- //
var getFindRepeated = function (arrHashtags) {
  arrHashtags.sort();
  for (var j = 0; j < arrHashtags.length - 1; j++) {
    if (arrHashtags[j] === arrHashtags[j + 1]) {
      return true;
    }
  }
  return false;
};

textHashtags.addEventListener('input', function (evt) {
  var target = evt.target;
  var hashtagsList = target.value.toLowerCase().split(' ');

  // все равно пропускает если несколько хеш-тегов, буду переделывать, а так же еще нету проверок:
  // строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.;

  for (var h = 0; h < hashtagsList.length; h++) {
    if (hashtagsList[h].charAt(0) !== '#') {
      target.setCustomValidity(
          'Хэш-тег должен начинаться с символа # (решётка)'
      );
    } else if (hashtagsList[h].length === 1 && hashtagsList[h].charAt(0) === '#') {
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
    } else if (getFindRepeated(hashtagsList)) {
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
});


// ползунок только потестил, чтобы двигался и с ним шкала заполнялась

// var effectLevelPin = document.querySelector('.effect-level__pin');
// var effectLevelDepth = document.querySelector('.effect-level__depth');
// effectLevelPin.addEventListener('mousedown', function (evt) {
//   evt.preventDefault();
//   var startCoords = {
//     x: evt.clientX,
//   };
//   var dragged = false;
//   var onMouseMove = function (moveEvt) {
//     moveEvt.preventDefault();
//     dragged = true;
//     var shift = {
//       x: startCoords.x - moveEvt.clientX,
//     };
//     startCoords = {
//       x: moveEvt.clientX,
//     };
//     var pzdc = (effectLevelPin.offsetLeft - shift.x);
//     if (pzdc < 0) {
//       effectLevelPin.style.left = 0 + 'px';
//       effectLevelDepth.style.width = effectLevelPin.style.left;
//     } else {
//       if (pzdc > 450) {
//         effectLevelPin.style.left = 450 + 'px';
//         effectLevelDepth.style.width = effectLevelPin.style.left;
//       } else {
//         effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
//         effectLevelDepth.style.width = effectLevelPin.style.left;
//       }
//     }
//   };
//
//   var onMouseUp = function (upEvt) {
//     upEvt.preventDefault();
//     document.removeEventListener('mousemove', onMouseMove);
//     document.removeEventListener('mouseup', onMouseUp);
//     if (dragged) {
//       var onClickPreventDefault = function (clickEvt) {
//         clickEvt.preventDefault();
//         effectLevelPin.removeEventListener('click', onClickPreventDefault);
//       };
//       effectLevelPin.addEventListener('click', onClickPreventDefault);
//     }
//   };
//
//   document.addEventListener('mousemove', onMouseMove);
//   document.addEventListener('mouseup', onMouseUp);
// });
