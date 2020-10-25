'use strict';

(function () {
  var BUTTON_EVT = window.constants.BUTTON_EVT;
  var map = window.map.element;
  var mainPin = window.pin.mainElement;
  var addAdverts = window.data.addAdverts;
  var changeAddress = window.form.changeAddress;
  var onRoomSelectChange = window.form.onRoomSelectChange;
  var onTypeSelectChange = window.form.onTypeSelectChange;
  var onTimeInSelectChange = window.form.onTimeInSelectChange;
  var onTimeOutSelectChange = window.form.onTimeOutSelectChange;
  var setFieldsetState = window.form.setFieldsetState;
  var renderAdverts = window.pin.renderAdverts;
  var addForm = window.form.ad;
  var isEnterEvent = window.util.isEnterEvent;

  addAdverts();

  var setFormPreferences = function () {
    changeAddress();
    onRoomSelectChange();
    onTypeSelectChange();
    onTimeInSelectChange();
    onTimeOutSelectChange();
    setFieldsetState();
  };

  setFormPreferences();

  var activatePage = function () {
    map.classList.remove('map--faded');

    renderAdverts();
    setFieldsetState();

    addForm.classList.remove('ad-form--disabled');

    mainPin.removeEventListener('mousedown', onMainPinMouseDown);
    mainPin.removeEventListener('keydown', onEnterKeydown);
  };

  var onMainPinMouseDown = function (evt) {
    if (evt.button === BUTTON_EVT) {
      activatePage();
      changeAddress();
    }
  };

  var onEnterKeydown = function (evt) {
    isEnterEvent(evt, function () {
      activatePage();
      changeAddress();
    });
  };

  mainPin.addEventListener('mousedown', onMainPinMouseDown);
  mainPin.addEventListener('keydown', onEnterKeydown);
})();
