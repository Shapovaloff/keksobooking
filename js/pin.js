'use strict';

(function () {
  var mapPinMain = window.map.querySelector('.map__pin--main');

  var pins = window.map.querySelector('.map__pins');

  var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var createAdvert = function (pin) {
    var pinElement = pinsTemplate.cloneNode(true);

    var pinImage = pinElement.querySelector('img');
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    pinElement.style.left = pin.location.x - window.constants.PIN_WIDTH / 2 + 'px';
    pinElement.style.top = pin.location.y - window.constants.PIN_HEIGHT + 'px';

    pinElement.addEventListener('click', function () {

      window.card.removeActivePin();
      pinElement.classList.add('map__pin--active');
      window.card.removePopup();

      window.map.insertBefore(window.card.createCard(pin), window.card.mapFilters);
    });

    return pinElement;
  };


  var renderAdverts = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < window.data.adverts.length; i++) {
      fragment.appendChild(createAdvert(window.data.adverts[i]));
    }

    pins.appendChild(fragment);
  };

  var pin = {
    mapPinMain: mapPinMain,
    renderAdverts: renderAdverts
  };

  window.pin = pin;
})();
