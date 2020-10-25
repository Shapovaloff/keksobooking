'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var Photo = {
    WIDTH: 70,
    HEIGTH: 70,
    ALT: 'Фотография жилья'
  };

  var form = window.form.ad;

  var fileChooserAvatar = form.querySelector('.ad-form-header__upload input[type=file]');
  var previewAvatar = form.querySelector('.ad-form-header__upload img');
  var defaultAvatar = previewAvatar.src;

  var showPhoto = function (element, preview) {
    var file = element.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview(reader.result);
      });

      reader.readAsDataURL(file);
    }
  };

  fileChooserAvatar.addEventListener('change', function () {
    showPhoto(fileChooserAvatar, function (image) {
      previewAvatar.src = image;
    });
  });

  var photoContainer = form.querySelector('.ad-form__photo-container');
  var fileChooserPhotos = form.querySelector('.ad-form__upload input[type=file]');
  var previewPhoto = form.querySelector('.ad-form__photo');
  var previews = [];

  fileChooserPhotos.addEventListener('change', function () {
    showPhoto(fileChooserPhotos, createPhotoElement);
  });

  var createPhotoElement = function (src) {
    var element = document.createElement('div');
    element.classList.add('ad-form__photo');

    var photoElement = document.createElement('img');
    photoElement.src = src;
    photoElement.width = Photo.WIDTH;
    photoElement.height = Photo.HEIGTH;
    photoElement.alt = Photo.ALT;

    element.appendChild(photoElement);
    previews.push(element);
    photoContainer.insertBefore(element, previewPhoto);
  };

  var resetPhoto = function () {
    if (previews) {
      previews.forEach(function (element) {
        element.remove();
      });
    }

    previews = [];
    previewAvatar.src = defaultAvatar;
  };

  window.preview = {
    resetPhoto: resetPhoto
  };

})();
