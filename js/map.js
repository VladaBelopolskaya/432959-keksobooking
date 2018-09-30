'use strict';

(function () {
  var HALF_MAIN_PIN_WEIGHT = 32.5;
  var MAIN_PIN_HEIGHT = 75;
  var MAIN_PIN_WEIGHT = 65;

  /**
   * Отображает карточку с подробной информацией
   */
  function onPinMouseup(element) {
    var elementId = element.id;
    var idIndex = +elementId.substr(3);
    var newCard = window.keksobooking.createСard(window.data.pins[idIndex]);
    var oldCard = window.keksobooking.help.findElement('.map__card');
    var parent = window.keksobooking.help.findElement('.map');

    if (oldCard) {
      parent.replaceChild(newCard, oldCard);
    } else {
      window.keksobooking.help.addElementToDomBefore('.map', '.map__filters-container', newCard);
    }

    var buttonClose = window.keksobooking.help.findElement('.popup__close');
    buttonClose.addEventListener('mouseup', onButtonCloseMouseup);
  }

  /**
   * Закрывает попап
   */
  function onButtonCloseMouseup() {
    var card = window.keksobooking.help.findElement('.map__card');
    var parent = window.keksobooking.help.findElement('.map');
    parent.removeChild(card);
  }

  /**
   * Добавляет обработчик на пин
   */
  function onMapMouseup(evt) {
    var element = evt.target;
    if (element.className === 'map__pin' && element.className !== 'map__pin--main') {
      onPinMouseup(element);
    }
    if (element.className === 'map__img-pin') {
      onPinMouseup(element.parentNode);
    }
  }

  /**
   * Активирует карту, форму и фильтры, добавляет пины в DOM, навешивает обрабочики на пины
   */
  window.keksobooking.onPinMainMouseup = function () {
    var templatePin = window.keksobooking.help.findElementTemplate('#pin', 'button');
    var pinElements = window.keksobooking.createPinElements(window.data.pins, templatePin);
    var map = window.keksobooking.help.findElement('.map');
    var adForm = window.keksobooking.help.findElement('.ad-form');
    var mapFilters = window.keksobooking.help.findElement('.map__filters');
    var newCard = window.keksobooking.createСard(window.data.pins[0]);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.keksobooking.help.noticeDisabled(false);
    mapFilters.classList.remove('ad-form--disabled');
    window.keksobooking.help.addChildtoDom('.map__pins', pinElements);
    window.keksobooking.help.addElementToDomBefore('.map', '.map__filters-container', newCard);
    map.addEventListener('mouseup', onMapMouseup)
    mapPinMain.removeEventListener('mouseup', window.keksobooking.onPinMainMouseup);
  };

  /**
   * Передвижение пина, изменение строки адреса в зависимости от расположения пина
   */
  function onPinMainMousedown(evt) {
    var address = window.keksobooking.help.findElement('#address');
    var locationX = HALF_MAIN_PIN_WEIGHT + mapPinMain.offsetLeft;
    var locationY = MAIN_PIN_HEIGHT + mapPinMain.offsetTop;
    var widthMapPins = document.querySelector('.map__pins').offsetWidth;
    address.value = locationX + ', ' + locationY;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };


    /**
     * Изменение строки адреса в зависимости от расположения пина
     */
    var onPinMainMousemove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      if (mapPinMain.offsetTop - shift.y > window.data.MAX_VERTICAL_COORDINATE) {
        mapPinMain.style.top = window.data.MAX_VERTICAL_COORDINATE + 'px';
      } else if (mapPinMain.offsetTop - shift.y < window.data.MIN_VERTICAL_COORDINATE) {
        mapPinMain.style.top = window.data.MIN_VERTICAL_COORDINATE + 'px';
      } else {
        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      }

      if (mapPinMain.offsetLeft - shift.x < 0) {
        mapPinMain.style.left = 0 + 'px';
      } else if (mapPinMain.offsetLeft - shift.x > widthMapPins - MAIN_PIN_WEIGHT) {
        mapPinMain.style.left = widthMapPins - MAIN_PIN_WEIGHT + 'px';
      } else {
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
      }

      locationX = HALF_MAIN_PIN_WEIGHT + mapPinMain.offsetLeft;
      locationY = MAIN_PIN_HEIGHT + mapPinMain.offsetTop;
      address.value = locationX + ', ' + locationY;
    };

    /**
     * Удаление обрабочика передвижения мыши
     */
    var onPinMainMouseUp = function () {
      document.removeEventListener('mousemove', onPinMainMousemove);
      document.removeEventListener('mouseup', onPinMainMouseUp);
    };

    document.addEventListener('mousemove', onPinMainMousemove);
    document.addEventListener('mouseup', onPinMainMouseUp);
  };

  window.keksobooking.help.noticeDisabled(true);
  var mapPinMain = window.keksobooking.help.findElement('.map__pin--main');
  var address = window.keksobooking.help.findElement('#address');
  address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

  mapPinMain.addEventListener('mouseup', window.keksobooking.onPinMainMouseup);
  mapPinMain.addEventListener('mousedown', onPinMainMousedown);
})();
