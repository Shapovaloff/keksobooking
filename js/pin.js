'use strict';

(function () {
  var PIN_WIDTH = window.defaults.PIN_WIDTH;
  var PIN_HEIGHT = window.defaults.PIN_HEIGHT;
  var MAIN_PIN_START_LEFT = 570;
  var MAIN_PIN_START_TOP = 375;
  var map = window.map.element;
  var removeActivePin = window.card.removeActivePin;
  var removePopup = window.card.removePopup;
  var createCard = window.card.create;
  var mapFilters = window.card.mapFilters;


  var mapPinMain = map.querySelector('.map__pin--main');

  var pins = map.querySelector('.map__pins');

  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createAdvert = function (pin) {
    var pinElement = pinsTemplate.cloneNode(true);

    var pinImage = pinElement.querySelector('img');
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';

    pinElement.addEventListener('click', function () {

      removeActivePin();
      pinElement.classList.add('map__pin--active');
      removePopup();

      map.insertBefore(createCard(pin), mapFilters);
    });

    return pinElement;
  };


  var renderAdverts = function (offers) {
    var fragment = document.createDocumentFragment();

    offers.forEach(function (offer) {
      fragment.appendChild(createAdvert(offer));
    });

    pins.appendChild(fragment);
  };

  var removePins = function () {
    var currentPins = map.querySelectorAll('.map__pin:not(.map__pin--main)');

    if (currentPins.length > 0) {
      currentPins.forEach(function (item) {
        item.remove();
      });
    }
  };

  var setMainPinStartingPosition = function () {
    mapPinMain.style.left = MAIN_PIN_START_LEFT + 'px';
    mapPinMain.style.top = MAIN_PIN_START_TOP + 'px';
  };

  window.pin = {
    mainElement: mapPinMain,
    renderAdverts: renderAdverts,
    setStartPosition: setMainPinStartingPosition,
    remove: removePins
  };
})();
