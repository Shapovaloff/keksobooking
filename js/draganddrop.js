'use strict';

(function () {
  var MAIN_PIN_WIDTH = window.defaults.MAIN_PIN_WIDTH;
  var MAIN_PIN_HEIGHT_ACTIVE = window.defaults.MAIN_PIN_HEIGHT_ACTIVE;
  var BUTTON_EVT = window.defaults.BUTTON_EVT;
  var workArea = window.defaults.workArea;
  var mainPin = window.pin.mainElement;
  var changeAddress = window.form.changeAddress;

  var setMainPinCoordinates = function (shift) {
    var y = mainPin.offsetTop - shift.y;
    var x = mainPin.offsetLeft - shift.x;

    if (x > workArea.COORD_X.max - MAIN_PIN_WIDTH / 2) {
      x = workArea.COORD_X.max - MAIN_PIN_WIDTH / 2;
    } else if (x < workArea.COORD_X.min - MAIN_PIN_WIDTH / 2) {
      x = workArea.COORD_X.min - MAIN_PIN_WIDTH / 2;
    }

    if (y > workArea.COORD_Y.max - MAIN_PIN_HEIGHT_ACTIVE) {
      y = workArea.COORD_Y.max - MAIN_PIN_HEIGHT_ACTIVE;
    } else if (y < workArea.COORD_Y.min - MAIN_PIN_HEIGHT_ACTIVE) {
      y = workArea.COORD_Y.min - MAIN_PIN_HEIGHT_ACTIVE;
    }

    mainPin.style.top = y + 'px';
    mainPin.style.left = x + 'px';
  };

  var onMainPinMouseMove = function (evt) {
    if (evt.button === BUTTON_EVT) {
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

        setMainPinCoordinates(shift);

        changeAddress();
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

  mainPin.addEventListener('mousedown', onMainPinMouseMove);
})();
