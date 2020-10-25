'use strict';

(function () {
  var formAddress = document.querySelector('#address');
  var adForm = document.querySelector('.ad-form');
  var formRoomNumber = adForm.querySelector('#room_number');
  var formCapacity = adForm.querySelector('#capacity');
  var formSelectType = adForm.querySelector('#type');
  var formInputPrice = adForm.querySelector('#price');
  var formSelectTimeIn = adForm.querySelector('#timein');
  var formSelectTimeOut = adForm.querySelector('#timeout');
  var fieldsetsAdForm = adForm.querySelectorAll('fieldset');

  var roomsCapacity = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };

  var changeAddress = function (width, height) {
    formAddress.value = Math.round(Number(window.pin.mapPinMain.style.left.replace('px', '')) + Number(width)) + ', ' + Math.round(Number(window.pin.mapPinMain.style.top.replace('px', '')) + Number(height));

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
    formInputPrice.min = window.constants.types[formSelectType.value].min;
    formInputPrice.placeholder = window.constants.types[formSelectType.value].min;
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


  var form = {
    adForm: adForm,
    changeAddress: changeAddress,
    onRoomSelectChange: onRoomSelectChange,
    onTypeSelectChange: onTypeSelectChange,
    onTimeInSelectChange: onTimeInSelectChange,
    onTimeOutSelectChange: onTimeOutSelectChange,
    setFieldsetState: setFieldsetState
  };

  window.form = form;
})();
