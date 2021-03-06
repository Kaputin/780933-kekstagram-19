'use strict';
(function () {
// --------------------------------Добавление фото и открытие, закрытие формы--------------------------------------------- //

  window.body = document.querySelector('body');
  window.textHashtags = document.querySelector('.text__hashtags');
  window.effectLevel = document.querySelector('.effect-level');
  window.previewImg = document.querySelector('.img-upload__preview img');
  window.effectLevelPin = document.querySelector('.effect-level__pin');
  window.effectLevelDepth = document.querySelector('.effect-level__depth');
  window.effectLevelValue = document.querySelector('.effect-level__value');
  var form = document.querySelector('.img-upload__form');
  var uploadFile = document.querySelector('#upload-file');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var uploadCancel = document.querySelector('#upload-cancel');
  var textDescription = document.querySelector('.text__description');
  var successTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

  var main = document.querySelector('main');
  var errorBtn = errorTemplate.querySelector('.error__button');
  var successBtn = successTemplate.querySelector('.success__button');

  var onPopupEscPress = function (evt) {
    if (textDescription === document.activeElement || window.textHashtags === document.activeElement) {
      return;
    } else if (evt.key === window.util.ESC_KEY) {
      closePopup();
    }
  };

  var openPopup = function () {
    if (uploadFile.files.length > 0) {
      window.body.classList.add('modal-open');
      imgUploadOverlay.classList.remove('hidden');
      window.previewImg.className = 'effects__preview--none'; // убираю эффект при открытии, т.к. при закрытии он оставляет последний
      window.effectLevel.hidden = true; // т.к. отрытие идет без эффекта убираю ползунок при открытии, потом при разбивке сделаю функцию отдельную
      window.previewImg.style.filter = '';
      window.previewImg.style.transform = 'scale(' + window.maxScale / 100 + ')';
      window.scaleValue.value = window.maxScale + '%';
      document.addEventListener('keydown', onPopupEscPress);
      uploadCancel.addEventListener('click', onClosePopupClick);
      uploadCancel.addEventListener('keydown', onClosePopupKeydown);
      uploadFile.removeEventListener('change', onOpenPopupClick);
      uploadFile.removeEventListener('change', onOpenPopupKeydown);
    }
  };

  var onOpenPopupClick = function () {
    openPopup();
  };

  var onOpenPopupKeydown = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      openPopup();
    }
  };

  var closePopup = function () {
    window.body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
    uploadFile.addEventListener('change', onOpenPopupClick);
    uploadFile.addEventListener('change', onOpenPopupKeydown);
    uploadCancel.removeEventListener('click', onClosePopupClick);
    uploadCancel.removeEventListener('keydown', onClosePopupKeydown);
    form.reset();
  };

  var onClosePopupClick = function () {
    closePopup();
  };

  var onClosePopupKeydown = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      closePopup();
    }
  };

  uploadFile.addEventListener('change', onOpenPopupClick);

  uploadFile.addEventListener('change', onOpenPopupKeydown);

  var onSuccess = function () {
    closePopup();
    main.appendChild(successTemplate);
    successBtn.focus();
    document.addEventListener('keydown', onSuccessEscPress);
    document.addEventListener('click', onSuccessClick);
    successBtn.addEventListener('keydown', onSuccessBtnKeydown);
  };

  var removeSuccess = function () {
    main.removeChild(successTemplate);
    document.removeEventListener('keydown', onSuccessEscPress);
    document.removeEventListener('click', onSuccessClick);
    successBtn.removeEventListener('keydown', onSuccessBtnKeydown);
  };

  var onSuccessEscPress = function (evt) {
    if (successTemplate === document.activeElement) {
      return;
    } else if (evt.key === window.util.ESC_KEY) {
      removeSuccess();
    }
  };

  var onSuccessClick = function () {
    removeSuccess();
  };

  var onSuccessBtnKeydown = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      removeSuccess();
    }
  };

  var onError = function () {
    main.appendChild(errorTemplate);
    errorTemplate.style.zIndex = 3;
    document.removeEventListener('keydown', onPopupEscPress);
    document.addEventListener('keydown', onErrorEscPress);
    document.addEventListener('click', onErrorClick);
    errorBtn.addEventListener('keydown', onErrorBtnKeydown);
  };

  var removeError = function () {
    main.removeChild(errorTemplate);
    document.removeEventListener('keydown', onErrorEscPress);
    document.removeEventListener('click', onErrorClick);
    document.addEventListener('keydown', onPopupEscPress);
    errorBtn.removeEventListener('keydown', onErrorBtnKeydown);
  };

  var onErrorEscPress = function (evt) {
    if (errorTemplate === document.activeElement) {
      return;
    } else if (evt.key === window.util.ESC_KEY) {
      removeError();
    }
  };

  var onErrorClick = function () {
    removeError();
  };

  var onErrorBtnKeydown = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      removeError();
    }
  };

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), onSuccess, onError);
    evt.preventDefault();
  });

})();
