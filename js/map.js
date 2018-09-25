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
var PIN_HEIGHT = 70;
var PIN_WEIGHT = 50;
var HALF_PIN_WEIGHT = 25;
var HALF_MAIN_PIN_WEIGHT = 32.5;
var MAIN_PIN_HEIGHT = 75;


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
 * Поиск элемента в DOM template
 * @param {string} id айди template
 * @param {string} tag тэг внутри template, который хотим клонировать
 * @return {Element} новый элемент
 */
function findElementTemplate(id, tag) {
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
    var locatoinX = randomInteger(0, widthMap - PIN_WEIGHT) + HALF_PIN_WEIGHT;
    var locationY = randomInteger(MIN_VERTICAL_COORDINATE + PIN_HEIGHT, MAX_VERTICAL_COORDINATE - PIN_HEIGHT) + PIN_HEIGHT;
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
    newElement.id = 'pin' + i;
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
  var templateCard = findElementTemplate('#card', 'article');
  var newElementCard = templateCard.cloneNode(true);
  var typeOfferEng = arrayElement.offer.type;
  var typeOfferRus = '';
  var numberOfRooms = arrayElement.offer.rooms;
  var declination = '';

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
  switch (numberOfRooms % 10) {
    case 1:
      declination = 'комната';
      break;
    case 2:
    case 3:
    case 4:
      declination = 'комнаты';
      break;
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 0:
      declination = 'комнат';
  }

  newElementCard.querySelector('.popup__title').textContent = arrayElement.offer.title;
  newElementCard.querySelector('.popup__text--address').textContent = arrayElement.offer.addres;
  newElementCard.querySelector('.popup__text--price').textContent = arrayElement.offer.price + '₽/ночь';
  newElementCard.querySelector('.popup__type').textContent = typeOfferRus;
  newElementCard.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' ' + declination + ' для ' + arrayElement.offer.guests + ' гостей';
  newElementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ' выезд до ' + arrayElement.offer.checkout;
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

/**
 * Поиск всех элементов по классу / id
 * @param {string} classElements класс элемента
 * @return {NodeListOf<Element>}
 */

function findElementAll(classElements) {
  return document.querySelectorAll(classElements);
}

/**
 * Поиск элемента по классу / id
 * @param {string} classElement класс элемента
 * @return {Element}
 */
function findElement(classElement) {
  return document.querySelector(classElement);
}

/**
 * Блокирует/разблокирует поля fielset внутри класса notice
 * @param {boolean} argument добавлять ли аргумент disabled fielset
 */
function noticeDisabled(argument) {
  var fieldsetNotice = findElementAll('.notice fieldset');
  for (var j = 0; j < fieldsetNotice.length; j++) {
    fieldsetNotice[j].disabled = argument;
  }
}

/**
 * Активирует карту, форму и фильтры, добавляет пины в DOM, навешивает обрабочики на пины
 */
function activeState() {
  var map = findElement('.map');
  var adForm = findElement('.ad-form');
  var mapFilters = findElement('.map__filters');

  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  noticeDisabled(false);
  mapFilters.classList.remove('ad-form--disabled');

  addChildtoDom('.map__pins', pinElements);
  var newCard = createСard(pins[0]);
  addElementToDomBefore('.map', '.map__filters-container', newCard);

  var mapPins = findElementAll('.map__pin');
  for (var i = 0; i < mapPins.length; i++) {
    mapPins[i].addEventListener('mouseup', showCard);
  }
}

/**
 * Отображает карточку с подробной информацией
 */
function showCard() {
  var element = event.currentTarget;
  var elementId = element.id;
  var idIndex = +elementId.substr(3);
  var newCard = createСard(pins[idIndex]);
  var oldCard = findElement('.map__card')
  var parent = findElement('.map');


  if (oldCard) {
    parent.replaceChild(newCard, oldCard);
  } else {
    addElementToDomBefore('.map', '.map__filters-container', newCard);
  }

  var buttonClose = findElement('.popup__close');
  buttonClose.addEventListener('mouseup', closePopup);
}

/**
 * Закрывает попап
 */
function closePopup() {
  var card = findElement('.map__card')
  var parent = findElement('.map')
  parent.removeChild(card);
}

/**
 * Изменяет адрес , в зависмиости от расположения главного пина
 */
function changeAddress() {
  var address = findElement('#address');
  var locationX = HALF_MAIN_PIN_WEIGHT + mapPinMain.offsetLeft
  var locationY = MAIN_PIN_HEIGHT + mapPinMain.offsetTop;
  address.value = locationX + ', ' + locationY;
}

var widthMapPins = document.querySelector('.map__pins').offsetWidth; // Ширина окна
var pins = createArrayPins(widthMapPins);
var templatePin = findElementTemplate('#pin', 'button');
var pinElements = createPinElements(pins, templatePin);

noticeDisabled(true);
var mapPinMain = findElement('.map__pin--main');
var address = findElement('#address');
address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
mapPinMain.addEventListener('mouseup', activeState);
mapPinMain.addEventListener('mouseup', changeAddress);

