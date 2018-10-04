'use strict';

(function () {
  /**
   * Создание и заполнение пина
   * @param {array} pins массив данных, в которых есть location, author, offer
   * @param {Element} templatePin элемент является кнопкой с тегом img внутри
   * @return {Element} новый элемент
   */
  window.keksobooking.createPinElements = function (pins, templatePin) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 8; i++) {
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
