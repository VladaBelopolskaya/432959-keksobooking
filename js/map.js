'use strict';

(function () {
  var HALF_MAIN_PIN_WEIGHT = 32.5;
  var MAIN_PIN_HEIGHT = 75;
  var MAIN_PIN_WEIGHT = 65;

  /**
   * Отображает карточку с подробной информацией
   */
  function onPinMouseup(evt) {
    var element = evt.currentTarget;
    var elementId = element.id;
    var idIndex = +elementId.substr(3);
    var newCard = window.createСard(window.data.pins[idIndex]);
    var oldCard = window.findElement('.map__card');
    var parent = window.findElement('.map');

    if (oldCard) {
      parent.replaceChild(newCard, oldCard);
    } else {
      window.addElementToDomBefore('.map', '.map__filters-container', newCard);
    }

    var buttonClose = window.findElement('.popup__close');
    buttonClose.addEventListener('mouseup', onButtonCloseMouseup);
  }

  /**
   * Закрывает попап
   */
  function onButtonCloseMouseup() {
    var card = window.findElement('.map__card');
    var parent = window.findElement('.map');
    parent.removeChild(card);
  }

  /**
   * Активирует карту, форму и фильтры, добавляет пины в DOM, навешивает обрабочики на пины
   */
  window.onPinMainMouseup = function () {
    var templatePin = window.findElementTemplate('#pin', 'button');
    var pinElements = window.createPinElements(window.data.pins, templatePin);
    var map = window.findElement('.map');
    var adForm = window.findElement('.ad-form');
    var mapFilters = window.findElement('.map__filters');
    var newCard = window.createСard(window.data.pins[0]);
    var mapPins = window.findElementAll('.map__pin');

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.noticeDisabled(false);
    mapFilters.classList.remove('ad-form--disabled');
    window.addChildtoDom('.map__pins', pinElements);
    window.addElementToDomBefore('.map', '.map__filters-container', newCard);

    for (var i = 1; i < mapPins.length; i++) {
      mapPins[i].addEventListener('mouseup', onPinMouseup);
    }

    mapPinMain.removeEventListener('mouseup', window.onPinMainMouseup);
  };

  /**
   * Передвижение пина
   */
  function onPinMainMousedown(evt) {
    var address = window.findElement('#address');
    var locationX = HALF_MAIN_PIN_WEIGHT + mapPinMain.offsetLeft;
    var locationY = MAIN_PIN_HEIGHT + mapPinMain.offsetTop;
    var widthMapPins = document.querySelector('.map__pins').offsetWidth;
    address.value = locationX + ', ' + locationY;

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
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

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.noticeDisabled(true);
  var mapPinMain = window.findElement('.map__pin--main');
  var address = window.findElement('#address');
  address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

  mapPinMain.addEventListener('mouseup', window.onPinMainMouseup);
  mapPinMain.addEventListener('mousedown', onPinMainMousedown);
})();
