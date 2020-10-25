'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  var onErrorSend = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    errorElement.querySelector('.error__button').addEventListener('click', onErrorMessageClick);
    mainContainer.appendChild(errorElement);

    document.addEventListener('keydown', onErrorMessageEscKeydown);
    document.addEventListener('mousedown', onErrorMessageMouseDown);
  };

  var errorMessageClose = function () {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
    document.removeEventListener('mousedown', onErrorMessageMouseDown);
  };

  var onErrorMessageClick = function () {
    errorMessageClose();
  };

  var onErrorMessageMouseDown = function () {
    errorMessageClose();
  };

  var onErrorMessageEscKeydown = function (evt) {
    window.util.isEscEvent(evt, errorMessageClose);
  };

  var onSuccessSend = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    mainContainer.appendChild(successElement);

    document.addEventListener('keydown', onSuccessMessageEscKeydown);
    document.addEventListener('mousedown', onSuccessMessageMouseDown);
  };

  var successMessageClose = function () {
    var successElement = document.querySelector('.success');
    successElement.remove();
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
    document.removeEventListener('mousedown', onSuccessMessageMouseDown);
  };

  var onSuccessMessageMouseDown = function () {
    successMessageClose();
  };

  var onSuccessMessageEscKeydown = function (evt) {
    window.util.isEscEvent(evt, successMessageClose);
  };

  window.message = {
    onErrorSend: onErrorSend,
    onSuccessSend: onSuccessSend
  };
})();
