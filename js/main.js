'use strict';

(function () {

  window.data.addAdverts();

  var setFormPreferences = function () {
    window.form.changeAddress(window.constants.MAIN_PIN_WIDTH / 2, window.constants.MAIN_PIN_HEIGHT / 2);
    window.form.onRoomSelectChange();
    window.form.onTypeSelectChange();
    window.form.onTimeInSelectChange();
    window.form.onTimeOutSelectChange();
    window.form.setFieldsetState();
  };

  setFormPreferences();

  var activatePage = function () {
    window.map.classList.remove('map--faded');

    window.pin.renderAdverts();
    window.form.setFieldsetState();

    window.form.adForm.classList.remove('ad-form--disabled');
  };

  window.pin.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === window.constants.BUTTON_EVT) {
      activatePage();
      window.form.changeAddress(window.constants.MAIN_PIN_WIDTH / 2, window.constants.MAIN_PIN_HEIGHT_ACTIVE);
    }
  });

  window.pin.mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constants.ENTER_KEYCODE) {
      activatePage();
      window.form.changeAddress(window.constants.MAIN_PIN_WIDTH / 2, window.constants.MAIN_PIN_HEIGHT_ACTIVE);
    }
  });
})();


