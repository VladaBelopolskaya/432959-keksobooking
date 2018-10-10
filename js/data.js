'use strict';

(function () {
  var PIN_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var PIN_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var PIN_TIME = ['12:00', '13:00', '14:00'];
  var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PIN_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_VERTICAL_COORDINATE = 130;
  var MAX_VERTICAL_COORDINATE = 630;
  var MIN_PRICE = 1000;
  var MAX_PRICE = 1000000;
  var MAX_ROOMS = 5;
  var MAX_GUESTS = 100;
  var PIN_HEIGHT = 70;
  var PIN_WEIGHT = 50;
  var HALF_PIN_WEIGHT = 25;

  /**
   * Выбор случайного числа между максимальным и минимальным
   * @param {number} min минимальное число
   * @param {number} max максимальное число
   * @return {number} случайное число
   */
  function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
  }

  /**
   * Перемешенная сортировка массива
   * @return {number} случайное число
   */
  function compareRandom() {
    return Math.random() - 0.5;
  }

  /**
   * Заполнение массива данных, чистая функция
   * @param {number} widthMap ширина окна с пинами
   * @return {array} заполненный массив пинов с данными
   */
  function createArrayPins(widthMap) {
    var pins = [];
    for (var i = 0; i < 8; i++) {
      var number = i + 1;
      var locatoinX = randomInteger(0, widthMap - PIN_WEIGHT) + HALF_PIN_WEIGHT;
      var locationY = randomInteger(MIN_VERTICAL_COORDINATE + PIN_HEIGHT, MAX_VERTICAL_COORDINATE - PIN_HEIGHT) + PIN_HEIGHT;
      var arrayFeatures = [];
      var data = {
        author: {
          avatar: 'img/avatars/user0' + number + '.png',
        },
        offer: {
          title: PIN_TITLE[i],
          address: locatoinX + ', ' + locationY,
          price: randomInteger(MIN_PRICE, MAX_PRICE),
          type: PIN_TYPE[randomInteger(0, PIN_TYPE.length - 1)],
          rooms: randomInteger(1, MAX_ROOMS),
          guests: randomInteger(1, MAX_GUESTS),
          checkin: PIN_TIME[randomInteger(0, PIN_TIME.length - 1)],
          checkout: PIN_TIME[randomInteger(0, PIN_TIME.length - 1)],
          features: arrayFeatures,
          description: '',
          photos: PIN_PHOTOS.sort(compareRandom),
        },
        location: {
          x: locatoinX,
          y: locationY,
        },
      };

      pins.push(data);
    }
    return pins;
  }

  var widthMapPins = document.querySelector('.map__pins').offsetWidth; // Ширина окна
  var pins = createArrayPins(widthMapPins);

  window.data = {
    pins: pins,
    MAX_VERTICAL_COORDINATE: MAX_VERTICAL_COORDINATE,
    MIN_VERTICAL_COORDINATE: MIN_VERTICAL_COORDINATE,
    PIN_PHOTOS: PIN_PHOTOS,
    PIN_FEATURES: PIN_FEATURES,
  };

})();
