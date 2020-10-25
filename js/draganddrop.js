'use strict';

(function () {
  var onMainPinMouseMove = function (evt) {
    if (evt.button === window.constants.BUTTON_EVT) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.pin.mapPinMain.style.top = (window.pin.mapPinMain.offsetTop - shift.y) + 'px';
        window.pin.mapPinMain.style.left = (window.pin.mapPinMain.offsetLeft - shift.x) + 'px';

        if (window.pin.mapPinMain.offsetLeft > window.constants.COORD_X.max - window.constants.MAIN_PIN_WIDTH / 2) {
          window.pin.mapPinMain.style.left = window.constants.COORD_X.max - window.constants.MAIN_PIN_WIDTH / 2 + 'px';
        } else if (window.pin.mapPinMain.offsetLeft < window.constants.COORD_X.min - window.constants.MAIN_PIN_WIDTH / 2) {
          window.pin.mapPinMain.style.left = window.constants.COORD_X.min - window.constants.MAIN_PIN_WIDTH / 2 + 'px';
        }

        if (window.pin.mapPinMain.offsetTop > window.constants.COORD_Y.max - window.constants.MAIN_PIN_HEIGHT_ACTIVE) {
          window.pin.mapPinMain.style.top = window.constants.COORD_Y.max - window.constants.MAIN_PIN_HEIGHT_ACTIVE + 'px';
        } else if (window.pin.mapPinMain.offsetTop < window.constants.COORD_Y.min - window.constants.MAIN_PIN_HEIGHT_ACTIVE) {
          window.pin.mapPinMain.style.top = window.constants.COORD_Y.min - window.constants.MAIN_PIN_HEIGHT_ACTIVE + 'px';
        }

        window.form.changeAddress(window.constants.MAIN_PIN_WIDTH / 2, window.constants.MAIN_PIN_HEIGHT_ACTIVE);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  };

  window.pin.mapPinMain.addEventListener('mousedown', onMainPinMouseMove);
})();
