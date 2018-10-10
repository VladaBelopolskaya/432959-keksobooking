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
  var MIN_LENGTH_TITLE = 30;
  var MAX_LENGTH_TITLE = 100;

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
    document.addEventListener('keydown', window.keksobooking.onMainPinPressEnter);
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

  /**
   * Сброс формы и сообщение об успешной отправке
   */
  function upLoadSuccess() {
    onResetButtonMouseup();

    var templateSuccess = window.keksobooking.utils.findElementTemplate('#success', 'div');
    var newElement = templateSuccess.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', newElement);
    window.keksobooking.listnerClosePopup(newElement);
  }

  /**
   * Сообщение об ошибке
   */
  function upLoadError() {
    var templateError = window.keksobooking.utils.findElementTemplate('#error', 'div');
    var newElement = templateError.cloneNode(true);
    document.body.insertAdjacentElement('afterbegin', newElement);

    window.keksobooking.listnerClosePopup(newElement);
  }

  /**
   * Сброс отправки формы по нажатию на Enter
   * @param {event} evt
   */
  function onFormSubmit(evt) {
    evt.preventDefault();
  }

  /**
   * Отправка данных на сервер
   */
  function onSubmitMouseup() {
    if (isValidation()) {
      window.keksobooking.upload(new FormData(adForm), upLoadSuccess, upLoadError);
    }
  }

  /**
   * Проверка валидации формы
   * @return {boolean} прошла ли валидацию форма
   */
  function isValidation() {
    var validationPrice = false;
    var validationTitle = false;
    var priceOfHousing = window.keksobooking.utils.findElement('#price');
    var titleOfHousing = window.keksobooking.utils.findElement('#title');
    if (+priceOfHousing.value < +priceOfHousing.min || +priceOfHousing.value > +priceOfHousing.max) {
      validationPrice = false;
    } else {
      validationPrice = true;
    }
    if (titleOfHousing.value.length < MIN_LENGTH_TITLE || titleOfHousing.value.length > MAX_LENGTH_TITLE) {
      validationTitle = false;
    } else {
      validationTitle = true;
    }
    return validationTitle && validationPrice;
  }
  /**
   * Сброс формы при нажатии клавиши Enter
   * @param {event} evt
   */
  function onResetButtonKeyDown(evt) {
    if (evt.keyCode === 13) {
      onResetButtonMouseup();
    }
  }
  /**
   * Отправка формы при нажатии клавиши Enter
   * @param {event} evt
   */
  function onSubmitButtonKeyDown(evt) {
    if (evt.keyCode === 13) {
      onSubmitMouseup();
    }
  }

  var typeOfHousing = window.keksobooking.utils.findElement('#type');
  typeOfHousing.addEventListener('change', onSelectTypeChange);
  var timeIn = window.keksobooking.utils.findElement('#timein');
  timeIn.addEventListener('change', onSelectTimeInChange);
  var timeOut = window.keksobooking.utils.findElement('#timeout');
  timeOut.addEventListener('change', onSelectTimeOutChange);
  var resetButton = window.keksobooking.utils.findElement('.ad-form__reset');
  resetButton.addEventListener('mouseup', onResetButtonMouseup);
  resetButton.addEventListener('keydown', onResetButtonKeyDown);
  var adForm = window.keksobooking.utils.findElement('.ad-form');
  adForm.addEventListener('submit', onFormSubmit);
  var roomNumber = window.keksobooking.utils.findElement('#room_number');
  roomNumber.addEventListener('change', onRoomNumberChange);
  var buttonSubmit = window.keksobooking.utils.findElement('.ad-form__submit');
  buttonSubmit.addEventListener('mouseup', onSubmitMouseup);
  buttonSubmit.addEventListener('keydown', onSubmitButtonKeyDown);

  var arrayOfCheckbox = ['#feature-wifi', '#feature-dishwasher', '#feature-parking', '#feature-washer', '#feature-elevator', '#feature-conditioner'];
  arrayOfCheckbox.forEach(function (item) {
    var element = window.keksobooking.utils.findElement(item);
    element.addEventListener('keydown', onFeaturesPressEnter);
    function onFeaturesPressEnter(evt) {
      if (evt.keyCode === 13) {
        element.checked = !element.checked;
      }
    }
  });
})();
