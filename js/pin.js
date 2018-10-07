'use strict';

(function () {
  var NUMBER_OF_PINS = 5;
  /**
   * Создание и заполнение пина
   * @param {array} pins массив данных, в которых есть location, author, offer
   * @return {Element} новый элемент
   */
  window.keksobooking.createPinElements = function (pins) {
    var templatePin = window.keksobooking.utils.findElementTemplate('#pin', 'button');
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < NUMBER_OF_PINS; i++) {
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
