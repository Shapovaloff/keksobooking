'use strict';

(function () {
  var ESC_KEYCODE = window.defaults.ESC_KEYCODE;
  var ENTER_KEYCODE = window.defaults.ENTER_KEYCODE;

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
