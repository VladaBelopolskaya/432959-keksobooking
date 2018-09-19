'use strict';

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


/**
 * Выбор случайного числа между максимальным и минимальным
 * @param {number} min минимальное число
 * @param {number} max максимальное число
 * @return {number} случайное число
 */
function randomInteger(min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
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
 * Поиск элемента в DOM
 * @param {string} id айди template
 * @param {string} tag тэг внутри template, который хотим клонировать
 * @return {Element} новый элемент
 */
function findElement(id, tag) {
  return document.querySelector(id).content.querySelector(tag);
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
    var locatoinX = randomInteger(0, widthMap);
    var locationY = randomInteger(MIN_VERTICAL_COORDINATE, MAX_VERTICAL_COORDINATE);
    var arrayFeatures = [];
    var arrayFeatureLenght = randomInteger(0, PIN_FEATURES.length - 1);
    for (var j = 0; j <= arrayFeatureLenght; j++) {
      arrayFeatures.push(PIN_FEATURES[j]);
    }
    var data = {
      author: {
        avatar: 'img/avatars/user0' + number + '.png'
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
        photos: PIN_PHOTOS.sort(compareRandom)
      },
      location: {
        x: locatoinX,
        y: locationY
      }
    };

    pins.push(data);
  }
  return pins;
};

/**
 * Создание и заполнение пина
 * @param {array} pins массив данных, в которых есть location, author, offer
 * @param {Element} templatePin элемент является кнопкой с тегом img внутри
 * @return {Element} новый элемент
 */
function createPinElements(pins, templatePin) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < 8; i++) {
    var newElement = templatePin.cloneNode(true);
    newElement.style.cssText = 'left: ' + pins[i].location.x + 'px; top: ' + pins[i].location.y + 'px;';
    newElement.children[0].src = pins[i].author.avatar;
    newElement.children[0].alt = pins[i].offer.title;
    fragment.appendChild(newElement);
  }
  return fragment;
};

/**
 * Добавление нового элемента в родительский элемент
 * @param {string} parentClass родительский класс
 * @param {Element} newChild новый дочерний элемент
 */
function addChildtoDom(parentClass, newChild) {
  document.querySelector(parentClass).appendChild(newChild);
}

/**
 * Создание и заполнение карточкии
 * @param {Element} arrayElement элемант массива, на основе которого надо сделать карточку
 * @return {Element} новый элемент
 */
function createСard(arrayElement) {
  var templateCard = findElement('#card', 'article');
  var newElementCard = templateCard.cloneNode(true);
  var typeOfferEng = arrayElement.offer.type;
  var typeOfferRus = '';

  var outFeatures = [];
  for (var k = arrayElement.offer.features.length; k < PIN_FEATURES.length; k++) {
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

  newElementCard.querySelector('.popup__title').textContent = arrayElement.offer.title;
  newElementCard.querySelector('.popup__text--address').textContent = arrayElement.offer.addres;
  newElementCard.querySelector('.popup__text--price').textContent = arrayElement.offer.price + '₽/ночь';
  newElementCard.querySelector('.popup__type').textContent = typeOfferRus;
  newElementCard.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' комнаты для ' + arrayElement.offer.guests + ' гостей';
  newElementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ' выезд до ' + arrayElement.offer.checkout;
  newElementCard.querySelector('.popup__features');
  newElementCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
  newElementCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;

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

  return newElementCard;
}

/**
 * Добавление нового элемента перед другим элементом
 * @param {string} parentClass родительский класс
 * @param {string} elementBeforeClass класс следующего элемента
 * @param {Element} newElement новый  элемент
 */
function addElementToDomBefore(parentClass, elementBeforeClass, newElement) {
  document.querySelector(parentClass).insertBefore(newElement, document.querySelector(elementBeforeClass));
}

var widthMapPins = document.querySelector('.map__pins').offsetWidth; // Ширина окна
var pins = createArrayPins(widthMapPins);
var templatePin = findElement('#pin', 'button');
var pinElements = createPinElements(pins, templatePin);
addChildtoDom('.map__pins', pinElements);
var newCard = createСard(pins[0]);
addElementToDomBefore('.map', '.map__filters-container', newCard);


