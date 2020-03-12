'use strict';
(function () {

  var scaleSmaller = document.querySelector('.scale__control--smaller');
  window.scaleValue = document.querySelector('.scale__control--value');
  var scaleBigger = document.querySelector('.scale__control--bigger');
  var scaleStep = 25;
  window.defaultScale = 100;
  window.maxScale = 100;
  var minScale = 25;

  window.scaleValue.value = window.defaultScale + '%';

  var reduceScale = function () {
    if (window.scaleValue.value === window.maxScale + '%') {
      window.scaleValue.value = window.maxScale - scaleStep + '%';
      window.previewImg.style.transform = 'scale(' + (window.maxScale - scaleStep) / 100 + ')';
    } else if (window.scaleValue.value === 0.75 * window.maxScale + '%') {
      window.scaleValue.value = 0.75 * window.maxScale - scaleStep + '%';
      window.previewImg.style.transform = 'scale(' + (0.75 * window.maxScale - scaleStep) / 100 + ')';
    } else if (window.scaleValue.value === 0.5 * window.maxScale + '%') {
      window.scaleValue.value = 0.5 * window.maxScale - scaleStep + '%';
      window.previewImg.style.transform = 'scale(' + (0.5 * window.maxScale - scaleStep) / 100 + ')';
    } else if (window.scaleValue.value === 0.25 * window.maxScale + '%') {
      return;
    }
  };

  var increaseScale = function () {
    if (window.scaleValue.value === window.maxScale + '%') {
      return;
    } else if (window.scaleValue.value === 0.75 * window.maxScale + '%') {
      window.scaleValue.value = 0.75 * window.maxScale + scaleStep + '%';
      window.previewImg.style.transform = 'scale(' + (0.75 * window.maxScale + scaleStep) / 100 + ')';
    } else if (window.scaleValue.value === 0.5 * window.maxScale + '%') {
      window.scaleValue.value = 0.5 * window.maxScale + scaleStep + '%';
      window.previewImg.style.transform = 'scale(' + (0.5 * window.maxScale + scaleStep) / 100 + ')';
    } else if (window.scaleValue.value === 0.25 * window.maxScale + '%') {
      window.scaleValue.value = minScale + scaleStep + '%';
      window.previewImg.style.transform = 'scale(' + (minScale + scaleStep) / 100 + ')';
    }
  };

  var onScaleBiggerClick = function () {
    increaseScale();
  };

  var onScaleBiggerKeydown = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      evt.preventDefault();
      increaseScale();
    }
  };

  var onScaleSmallerClick = function () {
    reduceScale();
  };

  var onScaleSmallerKeydown = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      evt.preventDefault();
      reduceScale();
    }
  };

  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleSmaller.addEventListener('keydown', onScaleSmallerKeydown);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
  scaleBigger.addEventListener('keydown', onScaleBiggerKeydown);

})();
