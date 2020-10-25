'use strict';

(function () {
  var mainContainer = document.querySelector('main');

  var onErrorSend = function (message) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    errorElement.querySelector('.error__message').textContent = message;
    errorElement.querySelector('.error__button').addEventListener('click', errorMessageClose);
    mainContainer.appendChild(errorElement);

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('mousedown', errorMessageClose);
  };

  var onEscPress = function (evt) {
    if (onSuccessSend && document.querySelector('.success')) {
      window.util.isEscEvent(evt, successMessageClose);
    } else if (onErrorSend && document.querySelector('.error')) {
      window.util.isEscEvent(evt, errorMessageClose);
    }
  };

  var errorMessageClose = function () {
    var errorElement = document.querySelector('.error');
    errorElement.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('mousedown', errorMessageClose);
  };

  var onSuccessSend = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    mainContainer.appendChild(successElement);

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('mousedown', successMessageClose);
  };

  var successMessageClose = function () {
    var successElement = document.querySelector('.success');
    successElement.remove();
    document.removeEventListener('keydown', onEscPress);
    document.removeEventListener('mousedown', successMessageClose);
  };

  window.message = {
    onErrorSend: onErrorSend,
    onSuccessSend: onSuccessSend
  };
})();
