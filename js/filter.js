'use strict';
(function () {
  var MAX_RANDOM_PHOTO = 10;
  var btnDefault = document.querySelector('#filter-default');
  var btnRandom = document.querySelector('#filter-random');
  var btnDiscussed = document.querySelector('#filter-discussed');

  var removeArrPhoto = function () {
    var fragment = window.similarListElement.querySelectorAll('.picture');
    fragment.forEach(function (item) {
      window.similarListElement.removeChild(item);
    });
  };

  var removeDebounced = window.debounce(removeArrPhoto);

  var sortDiscussed = function (arr) {
    return arr.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var onClickBtnSort = function (evt) {
    if (evt.target) {
      btnRandom.classList.remove('img-filters__button--active');
      btnDefault.classList.remove('img-filters__button--active');
      btnDiscussed.classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      removeDebounced();
      var renderArrPhotosDebounced = window.debounce(window.renderArrPhotos);
    }
    if (evt.target === btnRandom) {
      var photos = window.util.getRandomArray(window.photoData.slice());
      photos.length = MAX_RANDOM_PHOTO;
      renderArrPhotosDebounced(photos);
    } else
    if (evt.target === btnDefault) {
      renderArrPhotosDebounced(window.photoData);
    } else
    if (evt.target === btnDiscussed) {
      var photosMostDiscussed = sortDiscussed(window.photoData.slice());
      renderArrPhotosDebounced(photosMostDiscussed);
    }
  };

  btnDefault.addEventListener('click', onClickBtnSort);
  btnRandom.addEventListener('click', onClickBtnSort);
  btnDiscussed.addEventListener('click', onClickBtnSort);

})();
