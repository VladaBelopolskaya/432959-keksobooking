'use strict';

(function () {
  var HALF_MAIN_PIN_WEIGHT = 32.5;
  var MAIN_PIN_HEIGHT = 75;
  var MAIN_PIN_WEIGHT = 65;
  var MIN_VERTICAL_COORDINATE = 130;
  var MAX_VERTICAL_COORDINATE = 630;
  window.keksobooking.PINS_ARRAY_FROM_BACK = null;
  window.keksobooking.ENTER_CODE = 13;
  window.keksobooking.ESC_CODE = 27;
  /**
   * Отображает карточку с подробной информацией соответсвующего пина
   * @param {Element} element пин, который необходимо отрисовать
   */
  function onPinMouseup(element) {
    var elementId = element.id;
    var idIndex = +elementId.substr(3);
    var oldCard = window.keksobooking.utils.findElement('.map__card');
    var parent = window.keksobooking.utils.findElement('.map');
    var newCard = window.keksobooking.createСard(window.keksobooking.PINS_ARRAY_FROM_BACK[idIndex]);
    if (oldCard) {
      parent.replaceChild(newCard, oldCard);
    } else {
      window.keksobooking.utils.addElementToDomBefore('.map', '.map__filters-container', newCard);
    }

    listnerToCard();
  }

  /**
   * Навешивает обработчики на карточку с подробной информацией (закрытие при нажатии на клавишу ESC и при нажатии на крестик)
   */
  function listnerToCard() {
    var buttonClose = window.keksobooking.utils.findElement('.popup__close');
    buttonClose.addEventListener('mouseup', window.keksobooking.onButtonCloseMouseup);
    buttonClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.keksobooking.ENTER_CODE) {
        window.keksobooking.onButtonCloseMouseup();
      }
    });
    /**
     * Закрытие попапа при нажатии на кнопку ESC
     * @param {event} evnt
     */
    function onDocumentKeydown(evnt) {
      if (evnt.keyCode === window.keksobooking.ESC_CODE) {
        window.keksobooking.onButtonCloseMouseup();
      }
      document.removeEventListener('keydown', onDocumentKeydown);
    }

    document.addEventListener('keydown', onDocumentKeydown);
  }

  /**
   * Удаление карточки с подробной информацией из DOM
   */
  window.keksobooking.onButtonCloseMouseup = function () {
    var card = window.keksobooking.utils.findElement('.map__card');
    var parent = window.keksobooking.utils.findElement('.map');
    if (card) {
      parent.removeChild(card);
    }
  };

  /**
   * Обработчик, который чекает по какому элементу карты произошел клик и если этот элемент - пин, то запускает функцию для открытия карточки с описанием этого пина
   * @param {event} evt
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
   * Обрабтчик нажатия Enter, на выбраном пине
   * @param {event} evt
   */
  function onMapPressEnter(evt) {
    if (evt.keyCode === window.keksobooking.ENTER_CODE) {
      if (document.activeElement) {
        var element = document.activeElement;
        if (element.className === 'map__pin' && element.className !== 'map__pin--main') {
          onPinMouseup(element);
        }
      }
    }
  }
  /**
   * Обработчик нажатия Enter на главном пине
   * @param {event} evt
   */
  window.keksobooking.onMainPinPressEnter = function (evt) {
    if (evt.keyCode === window.keksobooking.ENTER_CODE) {
      if (document.activeElement) {
        var element = document.activeElement;
        if (element.className === 'map__pin map__pin--main') {
          window.keksobooking.onPinMainMouseup();
        }
      }
    }
  };

  /**
   * Успешная загрузка, вызов функций по созданию, добавлению в DOM пинов; созданию, добавлению в DOM карточки с описанием; разблокировние поля с фильтрами
   * @param {elements} resp данные с сервера
   */
  function successLoad(resp) {
    window.keksobooking.PINS_ARRAY_FROM_BACK = resp;

    var pinElements = window.keksobooking.createPinElements(resp, window.keksobooking.NUMBER_OF_PINS_ON_THE_MAP);
    window.keksobooking.utils.addChildtoDom('.map__pins', pinElements);

    var newCard = window.keksobooking.createСard(window.keksobooking.PINS_ARRAY_FROM_BACK[0]);
    window.keksobooking.utils.addElementToDomBefore('.map', '.map__filters-container', newCard);
    listnerToCard();

    var mapFilter = window.keksobooking.utils.findElementAll('.map__filter');
    mapFilter.forEach(function (element) {
      element.disabled = false;
    });

    var mapFeatures = window.keksobooking.utils.findElement('.map__features');
    mapFeatures.disabled = false;
  }

  /**
   * Активирует карту, форму и фильтры, запускает функцию загрузки данных с сервера, навешивает обрабочик на карту
   */
  window.keksobooking.onPinMainMouseup = function () {

    var map = window.keksobooking.utils.findElement('.map');
    var adForm = window.keksobooking.utils.findElement('.ad-form');
    var mapFilters = window.keksobooking.utils.findElement('.map__filters');

    var mapFilter = window.keksobooking.utils.findElementAll('.map__filter');
    mapFilter.forEach(function (item) {
      item.disabled = true;
    });

    var mapFeatures = window.keksobooking.utils.findElement('.map__features');
    mapFeatures.disabled = true;

    window.keksobooking.loadPins(successLoad, window.keksobooking.utils.errorLoad);

    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.keksobooking.utils.noticeDisabled(false);
    mapFilters.classList.remove('ad-form--disabled');
    map.addEventListener('mouseup', onMapMouseup);
    map.addEventListener('keydown', onMapPressEnter);
    mapPinMain.removeEventListener('mouseup', window.keksobooking.onPinMainMouseup);
    document.removeEventListener('keydown', window.keksobooking.onMainPinPressEnter);
  };
  /**
   * Передвижение пина, изменение строки адреса в зависимости от расположения пина
   * @param {event} evt
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
     * @param {event} moveEvt
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

      if (mapPinMain.offsetTop - shift.y > MAX_VERTICAL_COORDINATE) {
        mapPinMain.style.top = MAX_VERTICAL_COORDINATE + 'px';
      } else if (mapPinMain.offsetTop - shift.y < MIN_VERTICAL_COORDINATE) {
        mapPinMain.style.top = MIN_VERTICAL_COORDINATE + 'px';
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
  }

  window.keksobooking.utils.noticeDisabled(true);
  var mapPinMain = window.keksobooking.utils.findElement('.map__pin--main');
  var address = window.keksobooking.utils.findElement('#address');
  address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
  mapPinMain.addEventListener('mouseup', window.keksobooking.onPinMainMouseup);
  document.addEventListener('keydown', window.keksobooking.onMainPinPressEnter);
  mapPinMain.addEventListener('mousedown', onPinMainMousedown);
})();
