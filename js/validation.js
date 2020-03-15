'use strict';
(function () {
  var submit = document.querySelector('#upload-submit');

  var onCheckHashtag = function () {
    var targets = [];
    targets = window.textHashtags;
    if (targets.value === '') {
      return;
    } else {
      var hashtagsList = targets.value.toLowerCase().split(' ');
      for (var h = 0; h < hashtagsList.length; h++) {
        if (hashtagsList[h][0] !== '#') {
          targets.setCustomValidity(
              'Хэш-тег должен начинаться с символа # (решётка)'
          );
        } else if (hashtagsList[h].length === 1 && hashtagsList[h][0] === '#') {
          targets.setCustomValidity(
              'Хеш-тег не должен состоять только из одной решётки'
          );
        } else if (hashtagsList[h].length > 20) {
          targets.setCustomValidity(
              'Максимальная длина одного хэш-тега не должна превышать 20 символов, включая решётку'
          );
        } else if (hashtagsList[h].split('#').length > 2) {
          targets.setCustomValidity(
              'Хеш-теги должны разделяться пробелами'
          );
        } else if (window.util.hasRepeatingElement(hashtagsList[h], h, hashtagsList)) {
          targets.setCustomValidity(
              'Один и тот же хэш-тег не может быть использован дважды'
          );
        } else if (hashtagsList.length > 5) {
          targets.setCustomValidity(
              'Нельзя указать больше пяти хэш-тегов'
          );
        } else {
          targets.setCustomValidity('');
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
