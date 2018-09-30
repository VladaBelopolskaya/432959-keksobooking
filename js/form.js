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
    var priceOfHousing = window.keksobooking.help.findElement('#price');
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
    var map = window.keksobooking.help.findElement('.map');
    var adForm = window.keksobooking.help.findElement('.ad-form');
    var mapFilters = window.keksobooking.help.findElement('.map__filters');
    var mapPinMain = window.keksobooking.help.findElement('.map__pin--main');
    mapPinMain.addEventListener('mouseup', window.keksobooking.onPinMainMouseup);
    var address = window.keksobooking.help.findElement('#address');
    var mapCard = window.keksobooking.help.findElement('.map__card');

    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    adForm.reset();
    window.keksobooking.help.noticeDisabled(true);
    mapFilters.classList.add('ad-form--disabled');
    address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

    window.keksobooking.help.removeChildFromDom(mapCard);

    var mapPins = window.keksobooking.help.findElementAll('.map__pin');
    for (var i = 1; i < mapPins.length; i++) {
      window.keksobooking.help.removeChildFromDom(mapPins[i]);
    }
  }

  /**
   * Изменение количества гостей в зависимости от типа жилья
   */
  function onRoomNumberChange() {
    var capacity = window.keksobooking.help.findElement('#capacity');
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

  var typeOfHousing = window.keksobooking.help.findElement('#type');
  typeOfHousing.addEventListener('change', onSelectTypeChange);
  var timeIn = window.keksobooking.help.findElement('#timein');
  timeIn.addEventListener('change', onSelectTimeInChange);
  var timeOut = window.keksobooking.help.findElement('#timeout');
  timeOut.addEventListener('change', onSelectTimeOutChange);
  var resetButton = window.keksobooking.help.findElement('.ad-form__reset');
  resetButton.addEventListener('mouseup', onResetButtonMouseup);
  var roomNumber = window.keksobooking.help.findElement('#room_number');
  roomNumber.addEventListener('change', onRoomNumberChange);
})();
