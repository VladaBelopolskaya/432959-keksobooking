'use strict';

var PIN_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PIN_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_TIME = ['12:00', '13:00', '14:00'];
var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var arrayPins = [];
var widthMapPins = document.querySelector('.map__pins').offsetWidth; // Ширина окна

/**
 * Функция выбора случаного числа между максимальным и минимальным
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @returns {number} случайное число
 */
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

/**
 * Функция для перемешенной сортировки массива
 * @returns {number} случайное число
 */
var compareRandom = function () {
  return Math.random() - 0.5;
}

/**
 * Функция создания объекта
 * @param {text} id айди template
 * @param {text} tag тэг внутри template, который хотим клонировать
 * @returns {Element}
 */
var createObj = function (id, tag) {
  return document.querySelector(id).content.querySelector(tag);
}

/**
 * Функция заполнения массива данных
 */
var fullArray = function () {
  for (var i = 0; i < 8; i++) {
    var number = i + 1;
    var locatoinX = randomInteger(0, widthMapPins);
    var locationY = randomInteger(130, 630);
    var arrayFeatures = [];
    for (var j = 0; j <= randomInteger(0, 5); j++) {
      arrayFeatures.push(PIN_FEATURES[j]);
    }

    arrayPins[i] = {
      author: {
        avatar: 'img/avatars/user0' + number + '.png'
      },
      offer: {
        title: PIN_TITLE[i],
        address: locatoinX + ', ' + locationY,
        price: randomInteger(1000, 1000000),
        type: PIN_TYPE[randomInteger(0, 3)],
        rooms: randomInteger(1, 5),
        guests: randomInteger(1, 100), // Какой диапазон взять?
        checkin: PIN_TIME[randomInteger(0, 2)],
        checkout: PIN_TIME[randomInteger(0, 2)],
        features: arrayFeatures,
        description: '',
        photos: PIN_PHOTOS.sort(compareRandom)
      },
      location: {
        x: locatoinX,
        y: locationY
      }
    };
  }
};

/**
 * Функция создание и заполнения пина
 */
var createPin = function () {
  var templatePin = createObj('#pin', 'button');
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 8; i++) {
    var newElement = templatePin.cloneNode(true);
    newElement.style.cssText = 'left: ' + arrayPins[i].location.x + 'px; top: ' + arrayPins[i].location.y + 'px;';
    newElement.children[0].src = arrayPins[i].author.avatar;
    newElement.children[0].alt = arrayPins[i].offer.title;
    fragment.appendChild(newElement);
  }

  mapPins.appendChild(fragment);
};

/**
 * Функция создание и заполнения карточки
 */
var createСard = function () {
  var templateCard = createObj('#card', 'article');
  var map = document.querySelector('.map');
  var mapFilters = document.querySelector('.map__filters-container');
  var newElementCard = templateCard.cloneNode(true);

  var typeOfferEng = arrayPins[0].offer.type;
  var typeOfferRus = '';

  var outFeatures = [];
  for (var k = arrayPins[0].offer.features.length; k < PIN_FEATURES.length; k++) {
    outFeatures.push(PIN_FEATURES[k]);
  }
  for (var m = 0; m < outFeatures.length; m++) {
    newElementCard.querySelector('.popup__features > .popup__feature--' + outFeatures[m]).remove();
  }

  switch (typeOfferEng) {
    case 'flat':
      typeOfferRus = 'Квартира';
      break;
    case 'bungalo':
      typeOfferRus = 'Бунгало';
      break;
    case 'house':
      typeOfferRus = 'Дом';
      break;
    case 'palace':
      typeOfferRus = 'Дворец';
  }

  newElementCard.querySelector('.popup__title').textContent = arrayPins[0].offer.title;
  newElementCard.querySelector('.popup__text--address').textContent = arrayPins[0].offer.addres;
  newElementCard.querySelector('.popup__text--price').textContent = arrayPins[0].offer.price + '₽/ночь';
  newElementCard.querySelector('.popup__type').textContent = typeOfferRus;
  newElementCard.querySelector('.popup__text--capacity').textContent = arrayPins[0].offer.rooms + ' комнаты для ' + arrayPins[0].offer.guests + ' гостей';
  newElementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayPins[0].offer.checkin + ' выезд до ' + arrayPins[0].offer.checkout;
  newElementCard.querySelector('.popup__features');
  newElementCard.querySelector('.popup__description').textContent = arrayPins[0].offer.description;
  newElementCard.querySelector('.popup__avatar').src = arrayPins[0].author.avatar;

  var fragmentPhoto = document.createDocumentFragment();
  for (var i = 0; i < PIN_PHOTOS.length - 1; i++) {
    var newPhoto = newElementCard.querySelector('.popup__photos > .popup__photo').cloneNode(true);
    fragmentPhoto.appendChild(newPhoto);
  }
  newElementCard.querySelector('.popup__photos').appendChild(fragmentPhoto);

  var arrayPhotos = newElementCard.querySelectorAll('.popup__photos > .popup__photo');
  for (var j = 0; j < PIN_PHOTOS.length; j++) {
    arrayPhotos[j].src = PIN_PHOTOS[j];
  }

  map.insertBefore(newElementCard, mapFilters);
}

fullArray();
createPin();
createСard();


