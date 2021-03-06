'use strict';

(function () {
  var PIN_TYPE_SETTINGS = {
    flat: {
      minprice: 1000,
      placeholder: 1000,
    },
    bungalo: {
      minprice: 0,
      placeholder: 0,
    },
    house: {
      minprice: 5000,
      placeholder: 5000,
    },
    palace: {
      minprice: 10000,
      placeholder: 10000,
    },
  };

  /**
   * Изменяет минимальное значение и placeholder в зависимости от типа жилья
   */
  function onSelectTypeChange() {
    var priceOfHousing = window.keksobooking.utils.findElement('#price');
    var pinType = typeOfHousing.value;
    priceOfHousing.min = PIN_TYPE_SETTINGS[pinType].minprice;
    priceOfHousing.placeholder = PIN_TYPE_SETTINGS[pinType].placeholder;
  }

  /**
   * Изменение времени выезда в завистимости от времени заезда
   */
  function onSelectTimeInChange() {
    timeOut.value = timeIn.value;
  }

  /**
   * Изменение времени заезда в завсимости от вермени выезда
   */
  function onSelectTimeOutChange() {
    timeIn.value = timeOut.value;
  }

  /**
   * Сброс страницы
   */
  function onResetButtonMouseup() {
    var map = window.keksobooking.utils.findElement('.map');
    var adForm = window.keksobooking.utils.findElement('.ad-form');
    var mapFilters = window.keksobooking.utils.findElement('.map__filters');
    var mapPinMain = window.keksobooking.utils.findElement('.map__pin--main');
    mapPinMain.addEventListener('mouseup', window.keksobooking.onPinMainMouseup);
    var address = window.keksobooking.utils.findElement('#address');
    var mapCard = window.keksobooking.utils.findElement('.map__card');

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.keksobooking.utils.noticeDisabled(true);
    mapFilters.classList.add('ad-form--disabled');
    mapPinMain.style.cssText = 'left: 570px; top: 375px;';
    address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

    window.keksobooking.utils.removeChildFromDom(mapCard);
    window.keksobooking.utils.deletePinsFromMap();
  }

  /**
   * Изменение количества гостей в зависимости от типа жилья
   */
  function onRoomNumberChange() {
    var capacity = window.keksobooking.utils.findElement('#capacity');
    var capacityChildren = capacity.children;

    if (capacity.value > roomNumber.value || capacity.value === '0') {
      capacity.value = roomNumber.value;
    }

    if (roomNumber.value === '100') {
      capacity.value = '0';
      capacityChildren.forEach(function (item) {
        item.disabled = true;
        if (item.value === '0') {
          item.disabled = false;
        }
      });
    } else {
      capacityChildren.forEach(function (item) {
        if (item.value === '0') {
          item.disabled = true;
        } else if (item.value <= roomNumber.value) {
          item.disabled = false;
        } else {
          item.disabled = true;
        }
      });
    }
  }

  /**
   * Скрытие эементра при нажатии на ESC или произвольную область
   * @param {Element} element на который нужно навесить обработчик
   */
  window.keksobooking.listnerClosePopup = function (element) {
    element.addEventListener('mouseup', function () {
      window.keksobooking.utils.removeChildFromDom(element);
    });

    /**
     * Закрытие попапа при нажатии на кнопку ESC
     * @param evnt
     */
    function onDocumentKeydown(evnt) {
      if (evnt.keyCode === 27) {
        window.keksobooking.utils.removeChildFromDom(element);
      }
      document.removeEventListener('keydown', onDocumentKeydown);
    };

    document.addEventListener('keydown', onDocumentKeydown);
  };

  /**
   * Сброс формы и сообщение об успешной отправке
   */
  function upLoadSuccess() {
    onResetButtonMouseup();

    var templateSuccess = window.keksobooking.utils.findElementTemplate('#success', 'div');
    var newElement = templateSuccess.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', newElement);
    window.keksobooking.listnerClosePopup(newElement);
  };

  /**
   * Сообщение об ошибке
   */
  function upLoadError() {
    var templateError = window.keksobooking.utils.findElementTemplate('#error', 'div');
    var newElement = templateError.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', newElement);

    window.keksobooking.listnerClosePopup(newElement);
  };

  /**
   * Сброс страницы, сообщение об успешной отвравке данных, обработчик закрытия сообщения
   * @param evt
   */
  function onFormSubmit(evt) {
    window.keksobooking.upload(new FormData(adForm), upLoadSuccess, upLoadError);
    evt.preventDefault();
  }

  var typeOfHousing = window.keksobooking.utils.findElement('#type');
  typeOfHousing.addEventListener('change', onSelectTypeChange);
  var timeIn = window.keksobooking.utils.findElement('#timein');
  timeIn.addEventListener('change', onSelectTimeInChange);
  var timeOut = window.keksobooking.utils.findElement('#timeout');
  timeOut.addEventListener('change', onSelectTimeOutChange);
  var resetButton = window.keksobooking.utils.findElement('.ad-form__reset');
  resetButton.addEventListener('mouseup', onResetButtonMouseup);
  var adForm = window.keksobooking.utils.findElement('.ad-form');
  adForm.addEventListener('submit', onFormSubmit);
  var roomNumber = window.keksobooking.utils.findElement('#room_number');
  roomNumber.addEventListener('change', onRoomNumberChange);
})();
