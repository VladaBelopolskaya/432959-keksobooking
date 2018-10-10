'use strict';

(function () {
  window.keksobooking.NUMBER_OF_PINS_ON_THE_MAP = 5;
  /**
   * Создание фрагмента с пинами, которые в последующем будут добавлены в дом.
   * @param {array} pins массив данных, в которых есть location, author, offer
   * @param {number} numberOfPinsToRender число пинов, которое нужно сгененировать и добавить на карту
   * @return {DocumentFragment} фрагмент, готовый к отрисовке в DOM, в котором лежат пины
   */
  window.keksobooking.createPinElements = function (pins, numberOfPinsToRender) {
    var number = window.keksobooking.NUMBER_OF_PINS_ON_THE_MAP;
    if (numberOfPinsToRender < number) {
      number = numberOfPinsToRender;
    }
    var templatePin = window.keksobooking.utils.findElementTemplate('#pin', 'button');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < number; i++) {
      var newElement = templatePin.cloneNode(true);
      newElement.id = 'pin' + i;
      newElement.style.cssText = 'left: ' + pins[i].location.x + 'px; top: ' + pins[i].location.y + 'px;';
      newElement.children[0].src = pins[i].author.avatar;
      newElement.children[0].alt = pins[i].offer.title;
      fragment.appendChild(newElement);
    }
    return fragment;
  };
})();
