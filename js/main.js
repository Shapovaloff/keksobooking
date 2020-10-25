'use strict';
var COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var adverts = [];
var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var types = {
  palace: {
    ru: 'Дворец',
  },
  flat: {
    ru: 'Квартира',
  },
  house: {
    ru: 'Дом',
  },
  bungalo: {
    ru: 'Бунгало ',
  }
};

var times = ['12.00', '13.00', '14.00'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var type = ['palace', 'flat', 'house', 'bungalo'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var shaffleArray = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var r = Math.floor(Math.random() * (i + 1));
    var tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
};
var mapActive = document.querySelector('.map');
mapActive.classList.remove('map--faded');
var addAdverts = function () {
  for (var i = 0; i < COUNT; i++) {
    adverts.push(
        {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png'
          },
          'offer': {
            'title': 'Уютное жилье',
            'address': getRandomInt(1, 600) + ',' + getRandomInt(130, 630),
            'price': getRandomInt(0, 1000000),
            'type': type[getRandomInt(0, type.length - 1)],
            'rooms': getRandomInt(0, 100),
            'guests': getRandomInt(0, 3),
            'checkin': times[getRandomInt(0, times.length - 1)],
            'checkout': times[getRandomInt(0, times.length - 1)],
            'features': shaffleArray(features).slice(0, getRandomInt(0, features.length)),
            'description': 'Описание жилья',
            'photos': shaffleArray(photos).slice(0, getRandomInt(0, photos.length))
          },
          'location': {
            'x': getRandomInt(1, mapActive.offsetWidth),
            'y': getRandomInt(130, 630)
          }
        }
    );
  }
};
addAdverts();
var pins = mapActive.querySelector('.map__pins');
var pinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var createAdvert = function (pin) {
  var pinElement = pinsTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinImage.src = pin.author.avatar;
  pinImage.alt = pin.offer.title;
  pinElement.style.left = pin.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = pin.location.y - PIN_HEIGHT + 'px';
  return pinElement;
};
var renderAdverts = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(createAdvert(adverts[i]));
  }
  pins.appendChild(fragment);
};

renderAdverts();

var mapFilters = mapActive.querySelector('.map__filters-container');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createCards = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  var cardTitle = cardElement.querySelector('.popup__title');
  var cardAddress = cardElement.querySelector('.popup__text--address');
  var cardPrice = cardElement.querySelector('.popup__text--price');
  var cardType = cardElement.querySelector('.popup__type');
  var cardCapacity = cardElement.querySelector('.popup__text--capacity');
  var cardTime = cardElement.querySelector('.popup__text--time');

  var cardFeatures = cardElement.querySelector('.popup__features');
  var cardFeaturesItem = cardFeatures.querySelectorAll('.popup__feature');
  for (var i = 0; i < cardFeaturesItem.length; i++) {
    var cardFeatureClass = 'popup__feature--' + card.offer.features[i];
    if (!cardFeaturesItem[i].classList.contains(cardFeatureClass)) {
      cardFeaturesItem[i].remove();
    }
  }

  var cardDescription = cardElement.querySelector('.popup__description');

  var cardPhotos = cardElement.querySelector('.popup__photos');
  var cardPhotosImage = cardPhotos.querySelector('img');

  for (var j = 0; j < card.offer.photos.length; j++) {

    var cardPhoto = cardPhotosImage.cloneNode(true);
    cardPhotos.appendChild(cardPhoto);
    cardPhotosImage.src = card.offer.photos[j];
  }

  var cardAvatar = cardElement.querySelector('.popup__avatar');

  cardTitle.textContent = card.offer.title;
  cardAddress.textContent = card.offer.address;
  cardPrice.textContent = card.offer.price + ' ₽/ночь';
  cardType.textContent = types[card.offer.type].ru;
  cardCapacity.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardDescription.textContent = card.offer.description;
  cardAvatar.src = card.author.avatar;

  return cardElement;
};

var renderCards = function () {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(createCards(adverts[0]));

  mapActive.insertBefore(fragment, mapFilters);
};

renderCards();
