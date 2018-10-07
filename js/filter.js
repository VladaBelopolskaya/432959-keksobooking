'use strict';

(function () {
  var type = '';
  var price = '';
  var rooms = '';
  var guests = '';
  var features = [];

  /**
   * Обновление пинов, которые нужно отрисовать на карте
   */
  function updatePins() {
    var filteredPin = window.keksobooking.PINS_ARRAY_FROM_BACK.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if ((rankDiff) === 0) {
        rankDiff = window.keksobooking.PINS_ARRAY_FROM_BACK.indexOf(left) - window.keksobooking.PINS_ARRAY_FROM_BACK.indexOf(right);
      }
      return rankDiff;
    });

    var oldPins = window.keksobooking.utils.findElementAll('.map__pin');
    for (var i = 1; i < oldPins.length; i++) {
      window.keksobooking.utils.removeChildFromDom(oldPins[i]);
    }

    var pinElements = window.keksobooking.createPinElements(filteredPin);
    window.keksobooking.utils.addChildtoDom('.map__pins', pinElements);
  }

  /**
   * Высчитывание ранка для соответсвующего пина
   * @param {Element} pin пин из массива пинов
   * @return {number} число (чем больше, теб элемент более похож на то, что выставлено в фильтрах)
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

    for (var i = 0; i < features.length; i++) {
      if (featuresPin.indexOf(features[i]) > -1) {
        rank += 1;
      }
    }

    return rank;
  }

  /**
   * Закрывает карточку с подробной информацией, записывает в переменные значения из фильтров, запускает функцию обновления пинов
   */
  function onChangeValue() {
    features = [];
    type = housingType.value;
    price = housingPrice.value;
    rooms = housingRooms.value;
    guests = housingGuests.value;

    if (filterWifi.checked === true) {
      features.push(filterWifi.value);
    }
    if (filterDishwasher.checked === true) {
      features.push(filterDishwasher.value);
    }
    if (filterParking.checked === true) {
      features.push(filterParking.value);
    }
    if (filterWasher.checked === true) {
      features.push(filterWasher.value);
    }
    if (filterElevator.checked === true) {
      features.push(filterElevator.value);
    }
    if (filterConditioner.checked === true) {
      features.push(filterConditioner.value);
    }

    window.setTimeout(function () {
      updatePins();
    }, 1000);
  }

  var housingType = window.keksobooking.utils.findElement('#housing-type');
  housingType.addEventListener('change', onChangeValue);
  var housingPrice = window.keksobooking.utils.findElement('#housing-price');
  housingPrice.addEventListener('change', onChangeValue);
  var housingRooms = window.keksobooking.utils.findElement('#housing-rooms');
  housingRooms.addEventListener('change', onChangeValue);
  var housingGuests = window.keksobooking.utils.findElement('#housing-guests');
  housingGuests.addEventListener('change', onChangeValue);
  var housingFeatures = window.keksobooking.utils.findElement('#housing-features');
  housingFeatures.addEventListener('change', onChangeValue);
  var filterWifi = window.keksobooking.utils.findElement('#filter-wifi');
  filterWifi.addEventListener('change', onChangeValue);
  var filterDishwasher = window.keksobooking.utils.findElement('#filter-dishwasher');
  filterDishwasher.addEventListener('change', onChangeValue);
  var filterParking = window.keksobooking.utils.findElement('#filter-parking');
  filterParking.addEventListener('change', onChangeValue);
  var filterWasher = window.keksobooking.utils.findElement('#filter-washer');
  filterWasher.addEventListener('change', onChangeValue);
  var filterElevator = window.keksobooking.utils.findElement('#filter-elevator');
  filterElevator.addEventListener('change', onChangeValue);
  var filterConditioner = window.keksobooking.utils.findElement('#filter-conditioner');
  filterConditioner.addEventListener('change', onChangeValue);
})();
