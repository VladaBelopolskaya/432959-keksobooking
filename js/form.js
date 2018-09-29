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
    var priceOfHousing = window.findElement('#price');
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
    var map = window.findElement('.map');
    var adForm = window.findElement('.ad-form');
    var mapFilters = window.findElement('.map__filters');
    var mapPinMain = window.findElement('.map__pin--main');
    mapPinMain.addEventListener('mouseup', window.onPinMainMouseup);
    var address = window.findElement('#address');
    var mapCard = window.findElement('.map__card');

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.noticeDisabled(true);
    mapFilters.classList.add('ad-form--disabled');
    address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

    window.removeChildFromDom(mapCard);

    var mapPins = window.findElementAll('.map__pin');
    for (var i = 1; i < mapPins.length; i++) {
      window.removeChildFromDom(mapPins[i]);
    }
  }

  /**
   * Изменение количества гостей в зависимости от типа жилья
   */
  function onRoomNumberChange() {
    var capacity = window.findElement('#capacity');
    var capacityChildren = capacity.children;

    if (capacity.value > roomNumber.value || capacity.value === '0') {
      capacity.value = roomNumber.value;
    }

    if (roomNumber.value === '100') {
      capacity.value = '0';
      for (var i = 0; i < capacityChildren.length; i++) {
        capacityChildren[i].disabled = true;
        if (capacityChildren[i].value === '0') {
          capacityChildren[i].disabled = false;
        }
      }
    } else {
      for (var j = 0; j < capacityChildren.length; j++) {
        if (capacityChildren[j].value === '0') {
          capacityChildren[j].disabled = true;
        } else if (capacityChildren[j].value <= roomNumber.value) {
          capacityChildren[j].disabled = false;
        } else {
          capacityChildren[j].disabled = true;
        }
      }
    }
  }

  var typeOfHousing = window.findElement('#type');
  typeOfHousing.addEventListener('change', onSelectTypeChange);
  var timeIn = window.findElement('#timein');
  timeIn.addEventListener('change', onSelectTimeInChange);
  var timeOut = window.findElement('#timeout');
  timeOut.addEventListener('change', onSelectTimeOutChange);
  var resetButton = window.findElement('.ad-form__reset');
  resetButton.addEventListener('mouseup', onResetButtonMouseup);
  var roomNumber = window.findElement('#room_number');
  roomNumber.addEventListener('change', onRoomNumberChange);
})();
