'use strict';

(function () {
  var map = document.querySelector('.map');

  var isActiveMap = function () {
    return !map.classList.contains('map--faded');
  };

  window.map = {
    element: map,
    isActive: isActiveMap
  };
})();
