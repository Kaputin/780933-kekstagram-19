'use strict';
(function () {

  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImage = bigPicture.querySelector('.big-picture__img img');
  var pictureLikes = bigPicture.querySelector('.likes-count');
  var pictureCommentsNumber = bigPicture.querySelector('.comments-count');
  var pictureCaption = bigPicture.querySelector('.social__caption');
  var socialCommentsList = bigPicture.querySelector('.social__comments');
  var socialComment = socialCommentsList.querySelector('.social__comment');
  var socialCommentCount = bigPicture.querySelector('.social__comment-count');
  var commentsLoader = bigPicture.querySelector('.social__comments-loader');
  var defaultCommentNumber = 5;

  socialCommentsList.innerHTML = '';

  var renderComment = function (comment) {
    var commentElement = socialComment.cloneNode(true);
    var commentAvatar = commentElement.querySelector('.social__picture');
    var commentText = commentElement.querySelector('.social__text');
    commentAvatar.src = comment.avatar;
    commentAvatar.alt = comment.name;
    commentText.textContent = comment.message;
    return commentElement;
  };

  var fillBigPicture = function (item) {
    bigPictureImage.src = item.url;
    pictureLikes.textContent = item.likes;
    pictureCommentsNumber.textContent = item.comments.length;
    pictureCaption.textContent = item.description;
  };

  var fillComment = function (array) {
    var fragment = document.createDocumentFragment();
    var commentsNumber = array.comments.length;
    if (commentsNumber <= defaultCommentNumber) {
      defaultCommentNumber = commentsNumber;
      socialCommentCount.textContent = array.comments.length + ' из ' + array.comments.length + ' комментариев';
      commentsLoader.classList.add('hidden');
    } else if (commentsNumber > defaultCommentNumber) {
      defaultCommentNumber = defaultCommentNumber;
      socialCommentCount.textContent = defaultCommentNumber + ' из ' + array.comments.length + ' комментариев';
    }
    for (var i = 0; i < defaultCommentNumber; i++) {
      var currentComment = renderComment(array.comments[i]);
      fragment.appendChild(currentComment);
    }
    socialCommentsList.appendChild(fragment);
  };

  var openFullScreen = function (evt) {
    var elementEvt = evt.target;
    if (!elementEvt.classList.contains('picture')) {
      elementEvt = elementEvt.closest('.picture');
    }
    if (!elementEvt) {
      return;
    }
    var currentImg = elementEvt.querySelector('.picture__img');
    var photos = window.photoData;
    for (var i = 0; i < photos.length; i++) {
      if (currentImg.src.indexOf(photos[i].url) !== -1) {
        window.currentPhoto = photos[i];
        break;
      }
    }
    fillBigPicture(window.currentPhoto);
    fillComment(window.currentPhoto);
    bigPicture.classList.remove('hidden');
    window.body.classList.add('modal-open');
    document.addEventListener('keydown', onBigPictureCloseEscPress);
    bigPictureClose.addEventListener('click', onBigPictureCloseClick);
    bigPictureClose.addEventListener('click', onBigPictureCloseEnterPress);
    window.similarListElement.removeEventListener('keydown', onPictureElementEnterPress);
    window.similarListElement.removeEventListener('click', onPictureElementClick);
    commentsLoader.addEventListener('click', onCommentsLoaderClick);
  };

  var onPictureElementEnterPress = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      openFullScreen(evt);
    }
  };

  var onPictureElementClick = function (evt) {
    openFullScreen(evt);
  };

  var onBigPictureCloseEscPress = function (evt) {
    if (evt.key === window.util.ESC_KEY) {
      closeFullScreen();
    }
  };

  var closeFullScreen = function () {
    socialCommentsList.innerHTML = '';
    bigPicture.classList.add('hidden');
    window.body.classList.remove('modal-open');
    commentsLoader.classList.remove('hidden');
    defaultCommentNumber = 5;
    window.similarListElement.addEventListener('keydown', onPictureElementEnterPress);
    window.similarListElement.addEventListener('click', onPictureElementClick);
    document.removeEventListener('keydown', onBigPictureCloseEscPress);
    bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
    bigPictureClose.removeEventListener('click', onBigPictureCloseEnterPress);
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  };

  var onBigPictureCloseClick = function () {
    closeFullScreen();
  };

  var onBigPictureCloseEnterPress = function (evt) {
    if (evt.key === window.util.ENTER_KEY) {
      closeFullScreen();
    }
  };

  window.similarListElement.addEventListener('click', onPictureElementClick);

  window.similarListElement.addEventListener('keydown', onPictureElementEnterPress);

  var getMoreComments = function () {
    defaultCommentNumber = defaultCommentNumber + 5;
    socialCommentsList.innerHTML = '';
    fillComment(window.currentPhoto);
  };

  var onCommentsLoaderClick = function () {
    getMoreComments();
  };

})();
