'use strict';
(function () {
// --------------------------------Добавление фото и открытие, закрытие формы--------------------------------------------- //

  var body = document.querySelector('body');
  var form = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var textDescription = document.querySelector('.text__description');
  window.textHashtags = document.querySelector('.text__hashtags');
  window.effectLevel = document.querySelector('.effect-level');
  window.previewImg = document.querySelector('.img-upload__preview img');
  window.effectLevelPin = document.querySelector('.effect-level__pin');
  window.effectLevelDepth = document.querySelector('.effect-level__depth');
  window.effectLevelValue = document.querySelector('.effect-level__value');

  var onPopupEscPress = function (evt) {
    if (textDescription === document.activeElement || window.textHashtags === document.activeElement) {
      return;
    } else if (evt.key === window.ESC_KEY) {
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
      window.previewImg.className = 'effects__preview--none'; // убираю эффект при открытии, т.к. при закрытии он оставляет последний
      window.effectLevel.hidden = true; // т.к. отрытие идет без эффекта убираю ползунок при открытии, потом при разбивке сделаю функцию отдельную
      window.previewImg.style.filter = '';
    }
  };

  var onOpenPopupClick = function () {
    openPopup();
  };

  var onOpenPopupKeydown = function (evt) {
    if (evt.key === window.ENTER_KEY) {
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
    form.reset();
  };

  var onClosePopupClick = function () {
    closePopup();
  };

  var onClosePopupKeydown = function (evt) {
    if (evt.key === window.ENTER_KEY) {
      closePopup();
    }
  };

  uploadFile.addEventListener('change', onOpenPopupClick);

  uploadFile.addEventListener('change', onOpenPopupKeydown);

})();
