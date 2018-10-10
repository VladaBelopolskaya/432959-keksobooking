'use strict';

(function () {
  var type = '';
  var price = '';
  var rooms = '';
  var guests = '';
  var features = [];
  var DEBOUNCE_INTERVAL = 500;

  /**
   * Определяет порядок сортировки, если ранг следующего элемента больше предыдущего, то элементы меняются местами. Если ранги элементов равны, то они сортируются в соответсвии их вхождения в исходном массиве
   * @param {Element} left предыдущий элемент
   * @param {Element} right последующий элемент
   * @return {number} если число положительное, то элементы меняются местами. Если число отрицательное, то не меняются местами
   */
  function comparison(left, right) {
    var rankDiff = getRank(right) - getRank(left);
    if ((rankDiff) === 0) {
      rankDiff = window.keksobooking.PINS_ARRAY_FROM_BACK.indexOf(left) - window.keksobooking.PINS_ARRAY_FROM_BACK.indexOf(right);
    }
    return rankDiff;
  }

  /**
   * Удаление всех пинов с карты (кроме самого главного), сортировка массива пинов в соответсвии со степенью похожести на то, что указано в фильтрах, отрисовываение новых пинов на карту
   * @param {number} numberOfPinsToRender количество пинов, которые необходимо создать
   */
  function updatePins(numberOfPinsToRender) {
    window.keksobooking.utils.deletePinsFromMap();
    var filteredPin = window.keksobooking.PINS_ARRAY_FROM_BACK.sort(comparison);

    var pinElements = window.keksobooking.createPinElements(filteredPin, numberOfPinsToRender);
    window.keksobooking.utils.addChildtoDom('.map__pins', pinElements);
  }

  /**
   * Высчитываем ранг каждого пина, для того что бы понять сколько пинов соответсвует фильтрам.
   * @param {number} numberOfFilters количество используемых фильтров
   * @return {number} количество пинов соответсвующих фильтрам
   */
  function howMuchToRender(numberOfFilters) {
    var numberOfPinsToRender = 0;
    window.keksobooking.PINS_ARRAY_FROM_BACK.forEach(function (item) {
      var rankOfItem = getRank(item);
      if (rankOfItem >= numberOfFilters) {
        numberOfPinsToRender++;
      }
    });
    return numberOfPinsToRender;
  }

  /**
   * Высчитывание степени схожести объявления с фильтрами (ранга) для соответсвующего пина. Минимальное возвращаемое значение 0, максимальное 10 (количество используемых фильтров). Если пин соответсвует выбранному фильтру, то к его рангу прибавляется 1.
   * @param {Element} pin пин из массива пинов
   * @return {number} число от 0 до 10
   */
  function getRank(pin) {
    var rank = 0;

    if (pin.offer.type === type) { rank += 1; }
    if (pin.offer.rooms === rooms) { rank += 1; }
    if (pin.offer.guests === guests) { rank += 1; }

    switch (price) {
      case 'high':
        if (pin.offer.price > 50000) { rank += 1; }
        break;
      case 'low':
        if (pin.offer.price < 10000) { rank += 1; }
        break;
      case 'middle':
        if (pin.offer.price >= 10000 && pin.offer.price <= 50000) { rank += 1; }
        break;
    }

    var featuresPin = pin.offer.features;
    features.forEach(function (item) {
      if (featuresPin.indexOf(item) > -1) {
        rank += 1;
      }
    });
    return rank;
  }

  /**
   * Закрывает карточку с подробной информацией, записывает в переменные значения из фильтров, запускает функцию обновления пинов
   */
  function onChangeValue() {
    var numberOfFilters = 0;

    features = [];
    type = housingType.value;
    if (type !== 'any') {
      numberOfFilters += 1;
    }

    price = housingPrice.value;
    if (price !== 'any') {
      numberOfFilters += 1;
    }

    rooms = housingRooms.value;
    if (rooms !== 'any') {
      numberOfFilters += 1;
    }

    guests = housingGuests.value;
    if (guests !== 'any') {
      numberOfFilters += 1;
    }

    if (filterWifi.checked === true) {
      features.push(filterWifi.value);
      numberOfFilters += 1;
    }
    if (filterDishwasher.checked === true) {
      features.push(filterDishwasher.value);
      numberOfFilters += 1;
    }
    if (filterParking.checked === true) {
      features.push(filterParking.value);
      numberOfFilters += 1;
    }
    if (filterWasher.checked === true) {
      features.push(filterWasher.value);
      numberOfFilters += 1;
    }
    if (filterElevator.checked === true) {
      features.push(filterElevator.value);
      numberOfFilters += 1;
    }
    if (filterConditioner.checked === true) {
      features.push(filterConditioner.value);
      numberOfFilters += 1;
    }

    var numberOfPinsToRender = howMuchToRender(numberOfFilters);
    updatePins(numberOfPinsToRender);
    window.keksobooking.onButtonCloseMouseup();
  }

  /**
   * Задержка выполения функции
   * @param {Function} fun функция, которая будет выполнена по истечению определенного времени
   * @return {Function}
   */
  function debounce(fun) {
    var lastTimeout = null;

    return function () {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(fun, DEBOUNCE_INTERVAL);
    };
  }


  var housingType = window.keksobooking.utils.findElement('#housing-type');
  var housingPrice = window.keksobooking.utils.findElement('#housing-price');
  var housingRooms = window.keksobooking.utils.findElement('#housing-rooms');
  var housingGuests = window.keksobooking.utils.findElement('#housing-guests');
  var filterWifi = window.keksobooking.utils.findElement('#filter-wifi');
  var filterDishwasher = window.keksobooking.utils.findElement('#filter-dishwasher');
  var filterParking = window.keksobooking.utils.findElement('#filter-parking');
  var filterWasher = window.keksobooking.utils.findElement('#filter-washer');
  var filterElevator = window.keksobooking.utils.findElement('#filter-elevator');
  var filterConditioner = window.keksobooking.utils.findElement('#filter-conditioner');

  var arrayOfSelect = ['#housing-type', '#housing-price', '#housing-rooms', '#housing-guests'];
  arrayOfSelect.forEach(function (item) {
    var element = window.keksobooking.utils.findElement(item);
    element.addEventListener('change', debounce(onChangeValue));
  });

  var arrayOfCheckbox = ['#filter-wifi', '#filter-dishwasher', '#filter-parking', '#filter-washer', '#filter-elevator', '#filter-conditioner'];
  arrayOfCheckbox.forEach(function (item) {
    var element = window.keksobooking.utils.findElement(item);
    element.addEventListener('change', debounce(onChangeValue));
    element.addEventListener('keydown', onFeaturesPressEnter);

    function onFeaturesPressEnter(evt) {
      if (evt.keyCode === 13) {
        element.checked = !element.checked;
        debounce(onChangeValue)();
      }
    }
  });

})();
