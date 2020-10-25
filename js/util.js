'use strict';

(function () {
  var ESC_KEYCODE = window.constants.ESC_KEYCODE;
  var ENTER_KEYCODE = window.constants.ENTER_KEYCODE;

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === ESC_KEYCODE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === ENTER_KEYCODE) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };
})();
