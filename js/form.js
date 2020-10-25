'use strict';

(function () {
  var MAIN_PIN_WIDTH = window.defaults.MAIN_PIN_WIDTH;
  var MAIN_PIN_HEIGHT = window.defaults.MAIN_PIN_HEIGHT;
  var MAIN_PIN_HEIGHT_ACTIVE = window.defaults.MAIN_PIN_HEIGHT_ACTIVE;
  var types = window.defaults.types;
  var mainPin = window.pin.mainElement;
  var formAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var formRoomNumber = adForm.querySelector('#room_number');
  var formCapacity = adForm.querySelector('#capacity');
  var formSelectType = adForm.querySelector('#type');
  var formInputPrice = adForm.querySelector('#price');
  var formSelectTimeIn = adForm.querySelector('#timein');
  var formSelectTimeOut = adForm.querySelector('#timeout');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');
  var isActive = window.map.isActive;
  var addFormReset = adForm.querySelector('.ad-form__reset');

  var roomsCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var changeAddress = function () {
    var width = MAIN_PIN_WIDTH / 2;
    var height = isActive() ? MAIN_PIN_HEIGHT_ACTIVE : (MAIN_PIN_HEIGHT / 2);

    formAddress.value = Math.round(parseInt(mainPin.style.left, 10) + width) + ', ' + Math.round(parseInt(mainPin.style.top, 10) + height);

    return formAddress.value;
  };

  var onRoomSelectChange = function () {
    if (formCapacity.options.length > 0) {
      [].forEach.call(formCapacity.options, function (item) {
        var currentRoomNumbers = roomsCapacity[formRoomNumber.value];
        var isHidden = !(currentRoomNumbers.indexOf(item.value) >= 0);

        item.hidden = isHidden;
        item.disabled = isHidden;
        item.selected = currentRoomNumbers[0] === item.value;
      });
    }
  };

  var onTypeSelectChange = function () {
    formInputPrice.min = types[formSelectType.value].min;
    formInputPrice.placeholder = types[formSelectType.value].min;
  };

  var onTimeInSelectChange = function () {
    formSelectTimeOut.value = formSelectTimeIn.value;
  };

  var onTimeOutSelectChange = function () {
    formSelectTimeIn.value = formSelectTimeOut.value;
  };

  var setFieldsetState = function () {
    fieldsetsAdForm.forEach(function (fieldset) {
      fieldset.disabled = !fieldset.disabled;
    });
  };


  adForm.addEventListener('invalid', function (evt) {
    evt.preventDefault();
  });

  formRoomNumber.addEventListener('change', onRoomSelectChange);
  formSelectType.addEventListener('change', onTypeSelectChange);
  formSelectTimeIn.addEventListener('change', onTimeInSelectChange);
  formSelectTimeOut.addEventListener('change', onTimeOutSelectChange);

  var onError = function () {
    window.message.onErrorSend('Ошибка загрузки объявления');
  };

  var onSuccess = function () {
    window.message.onSuccessSend();
    window.main.deactivatePage();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.save(onSuccess, onError, new FormData(adForm));
  };

  adForm.addEventListener('submit', onFormSubmit);

  addFormReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.main.deactivatePage();
  });

  window.form = {
    ad: adForm,
    changeAddress: changeAddress,
    onRoomSelectChange: onRoomSelectChange,
    onTypeSelectChange: onTypeSelectChange,
    onTimeInSelectChange: onTimeInSelectChange,
    onTimeOutSelectChange: onTimeOutSelectChange,
    setFieldsetState: setFieldsetState
  };
})();
