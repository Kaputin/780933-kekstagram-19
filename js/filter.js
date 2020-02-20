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

  var sortDiscussed = function (arr) { // в util не стал переносить, т.к. только здесь используется, но если необходимо перенесу
    return arr.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  };

  var onClickBtnSort = function (evet) {
    if (evet.target) {
      btnRandom.classList.remove('img-filters__button--active');
      btnDefault.classList.remove('img-filters__button--active');
      btnDiscussed.classList.remove('img-filters__button--active');
      evet.target.classList.add('img-filters__button--active');
    }
    if (evet.target === btnRandom) {
      removeArrPhoto();
      var photos = window.util.getRandomArray(window.wizardsPh.slice());
      photos.length = MAX_RANDOM_PHOTO;
      window.debounce(window.renderArrPhotos(photos)); // пока не понимаю почему не работает debounce, как только его не менял, задержка работает если setTimeout задавать, но там совсем не подходит, оставил пока так
      // window.setTimeout(function () {
      //   window.renderArrPhotos(photos)
      // }, 500);
    } else
    if (evet.target === btnDefault) {
      removeArrPhoto();
      window.debounce(window.renderArrPhotos(window.wizardsPh));
    } else
    if (evet.target === btnDiscussed) {
      removeArrPhoto();
      var photosMostDiscussed = sortDiscussed(window.wizardsPh.slice());
      window.debounce(window.renderArrPhotos(photosMostDiscussed));
    }
  };

  btnDefault.addEventListener('click', onClickBtnSort);
  btnRandom.addEventListener('click', onClickBtnSort);
  btnDiscussed.addEventListener('click', onClickBtnSort);

})();
