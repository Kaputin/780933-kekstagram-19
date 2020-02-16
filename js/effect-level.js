'use strict';
(function () {
  var MIN_PIN = 0;
  var effectLevelLine = document.querySelector('.effect-level__line');

  window.effectLevelPin.addEventListener('mousedown', function (evt) {
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

      var maxPin = window.effectLevel.offsetWidth - (effectLevelLine.offsetLeft + (window.effectLevel.offsetWidth - effectLevelLine.offsetWidth - effectLevelLine.offsetLeft));

      var movingPinAndDepth = (window.effectLevelPin.offsetLeft - shift.x);
      if (movingPinAndDepth < MIN_PIN) {
        window.effectLevelPin.style.left = MIN_PIN + 'px';
        window.effectLevelDepth.style.width = window.effectLevelPin.style.left;
        window.effectLevelValue.value = 0;
      } else {
        if (movingPinAndDepth > maxPin) {
          window.effectLevelPin.style.left = maxPin + 'px';
          window.effectLevelDepth.style.width = window.effectLevelPin.style.left;
        } else {
          window.effectLevelPin.style.left = (window.effectLevelPin.offsetLeft - shift.x) + 'px';
          window.effectLevelDepth.style.width = window.effectLevelPin.style.left;
          window.effectLevelValue.value = Math.floor((window.effectLevelPin.offsetLeft - shift.x) / (maxPin / 100));
        }
      }

      if (window.previewImg.className === 'effects__preview--chrome') {
        window.previewImg.style.filter = 'grayscale(1)';
        window.previewImg.style.filter = 'grayscale(' + window.effectLevelValue.value / 100 + ')';
      } else if (window.previewImg.className === 'effects__preview--sepia') {
        window.previewImg.style.filter = 'sepia(1)';
        window.previewImg.style.filter = 'sepia(' + window.effectLevelValue.value / 100 + ')';
      } else if (window.previewImg.className === 'effects__preview--marvin') {
        window.previewImg.style.filter = 'invert(100%)';
        window.previewImg.style.filter = 'invert(' + window.effectLevelValue.value + '%)';
      } else if (window.previewImg.className === 'effects__preview--phobos') {
        window.previewImg.style.filter = 'blur(3px)';
        window.previewImg.style.filter = 'blur(' + 3 * window.effectLevelValue.value / 100 + 'px)';
      } else if (window.previewImg.className === 'effects__preview--heat') {
        window.previewImg.style.filter = 'brightness(3)';
        window.previewImg.style.filter = 'brightness(' + (1 + 2 * window.effectLevelValue.value / 100) + ')';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.effectLevelPin.removeEventListener('click', onClickPreventDefault);
        };
        window.effectLevelPin.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove); // навесил на документ, что перемещать откинув мышь

    document.addEventListener('mouseup', onMouseUp); // навесил на документ, что перемещать откинув мышь

  });

})();
