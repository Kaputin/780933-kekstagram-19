'use strict';
(function () {
  var submit = document.querySelector('#upload-submit');

  var onCheckHashtag = function () {
    var target = [];
    target = window.textHashtags;
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
        } else if (window.hasRepeatingElement(hashtagsList[h], h, hashtagsList)) {
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
    if (evt.key === window.util.ENTER_KEY) {
      onCheckHashtag();
    }
  });
})();
