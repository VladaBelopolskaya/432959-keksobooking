'use strict';

(function () {
  var HALF_MAIN_PIN_WEIGHT = 32.5;
  var MAIN_PIN_HEIGHT = 75;
  var MAIN_PIN_WEIGHT = 65;
  var PINS_ARRAY_FROM_BACK = null;

  /**
   * Отображает карточку с подробной информацией
   */
  function onPinMouseup(element) {
    var elementId = element.id;
    var idIndex = +elementId.substr(3);
    var oldCard = window.keksobooking.utils.findElement('.map__card');
    var parent = window.keksobooking.utils.findElement('.map');
    var newCard = window.keksobooking.createСard(PINS_ARRAY_FROM_BACK[idIndex]);
    if (oldCard) {
      parent.replaceChild(newCard, oldCard);
    } else {
      window.keksobooking.utils.addElementToDomBefore('.map', '.map__filters-container', newCard);
    }

    var buttonClose = window.keksobooking.utils.findElement('.popup__close');
    buttonClose.addEventListener('mouseup', onButtonCloseMouseup);
  }

  /**
   * Закрывает попап
   */
  function onButtonCloseMouseup() {
    var card = window.keksobooking.utils.findElement('.map__card');
    var parent = window.keksobooking.utils.findElement('.map');
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
   * Успешная загрузка
   * @param resp
   */
  function successLoad(resp) {
    PINS_ARRAY_FROM_BACK = resp;
    var templatePin = window.keksobooking.utils.findElementTemplate('#pin', 'button');
    var pinElements = window.keksobooking.createPinElements(resp, templatePin);
    window.keksobooking.utils.addChildtoDom('.map__pins', pinElements);

    var newCard = window.keksobooking.createСard(PINS_ARRAY_FROM_BACK[0]);
    window.keksobooking.utils.addElementToDomBefore('.map', '.map__filters-container', newCard);
  }

  /**
   * Не успешная загрузка
   * @param {text} message текст ошибки
   */
  function errorLoad(message) {
    var templateError = window.keksobooking.utils.findElementTemplate('#error', 'div');
    var newElement = templateError.cloneNode(true);
    newElement.children[0].textContent = message;
    document.body.insertAdjacentElement('afterbegin', newElement);

    window.keksobooking.listnerClosePopup(newElement);
  }

  /**
   * Активирует карту, форму и фильтры, загружает и добавляет пины в DOM, навешивает обрабочики на пины
   */
  window.keksobooking.onPinMainMouseup = function () {

    var map = window.keksobooking.utils.findElement('.map');
    var adForm = window.keksobooking.utils.findElement('.ad-form');
    var mapFilters = window.keksobooking.utils.findElement('.map__filters');

    window.keksobooking.loadPins(successLoad, errorLoad);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.keksobooking.utils.noticeDisabled(false);
    mapFilters.classList.remove('ad-form--disabled');
    map.addEventListener('mouseup', onMapMouseup)
    mapPinMain.removeEventListener('mouseup', window.keksobooking.onPinMainMouseup);
  };

  /**
   * Передвижение пина, изменение строки адреса в зависимости от расположения пина
   */
  function onPinMainMousedown(evt) {
    var address = window.keksobooking.utils.findElement('#address');
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

  window.keksobooking.utils.noticeDisabled(true);
  var mapPinMain = window.keksobooking.utils.findElement('.map__pin--main');
  var address = window.keksobooking.utils.findElement('#address');
  address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

  mapPinMain.addEventListener('mouseup', window.keksobooking.onPinMainMouseup);
  mapPinMain.addEventListener('mousedown', onPinMainMousedown);
})();
