'use strict';

(function () {
  var map = document.querySelector('.map');

  var isActiveMap = function () {
    return !map.classList.contains('map--faded');
  };

  var deactivateMap = function () {
    map.classList.add('map--faded');
  };

  window.map = {
    element: map,
    isActive: isActiveMap,
    deactivateMap: deactivateMap
  };
})();
