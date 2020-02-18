'use strict';
(function () {

  var effectList = document.querySelector('.effects__list');

  var filterChangeHandler = function (evt) {
    if (evt.target) {
      window.previewImg.className = 'effects__preview--' + evt.target.value;
      if (window.previewImg.className !== 'effects__preview--none') {
        window.effectLevel.hidden = false;
        window.effectLevelValue.value = 100;
        window.effectLevelPin.style.left = '100%';
        window.effectLevelDepth.style.width = '100%';
        if (window.previewImg.className === 'effects__preview--chrome') {
          window.previewImg.style.filter = 'grayscale(1)';
        } else if (window.previewImg.className === 'effects__preview--sepia') {
          window.previewImg.style.filter = 'sepia(1)';
        } else if (window.previewImg.className === 'effects__preview--marvin') {
          window.previewImg.style.filter = 'invert(100%)';
        } else if (window.previewImg.className === 'effects__preview--phobos') {
          window.previewImg.style.filter = 'blur(3px)';
        } else if (window.previewImg.className === 'effects__preview--heat') {
          window.previewImg.style.filter = 'brightness(3)';
        }
      } else {
        window.previewImg.style.filter = '';
        window.effectLevel.hidden = true;
        window.effectLevelValue.value = 20;
        window.effectLevelPin.style.left = '20%';
        window.effectLevelDepth.style.width = '20%';
      }
    }
  };

  effectList.addEventListener('change', filterChangeHandler);

})();
