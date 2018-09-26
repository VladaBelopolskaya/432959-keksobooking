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
    default:
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
function onPinMainMouseup() {
  var templatePin = findElementTemplate('#pin', 'button');
  var pinElements = createPinElements(pins, templatePin);

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
    mapPins[i].addEventListener('mouseup', onPinMouseup);
  }

  console.dir(pinElements);
}

/**
 * Отображает карточку с подробной информацией
 */
function onPinMouseup(evt) {
  var element = evt.currentTarget;
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
  buttonClose.addEventListener('mouseup', onButtonCloseMouseup);
}

/**
 * Закрывает попап
 */
function onButtonCloseMouseup() {
  var card = findElement('.map__card')
  var parent = findElement('.map')
  parent.removeChild(card);
}

/**
 * Изменяет адрес в зависимости от расположения главного пина
 */
function onPinMainMousedown() {
  var address = findElement('#address');
  var locationX = HALF_MAIN_PIN_WEIGHT + mapPinMain.offsetLeft
  var locationY = MAIN_PIN_HEIGHT + mapPinMain.offsetTop;
  address.value = locationX + ', ' + locationY;
}

/**
 * Изменяет минимальное значение и placeholder в зависимости от типа жилья
 */
function onSelectTypeChange() {
  var priceOfHousing = findElement('#price');
  switch (typeOfHousing.value) {
    case 'flat':
      priceOfHousing.min = 1000;
      priceOfHousing.placeholder = 1000;
      break;
    case 'bungalo':
      priceOfHousing.min = 0;
      priceOfHousing.placeholder = 0;
      break;
    case 'house':
      priceOfHousing.min = 5000;
      priceOfHousing.placeholder = 5000;
      break;
    case 'palace':
      priceOfHousing.min = 10000;
      priceOfHousing.placeholder = 10000;
  }
}

/**
 * Изменение времени выезда в завистимости от времени заезда
 */
function onSelectTimeInChange() {
  switch (timeIn.value) {
    case '12:00':
      timeOut.value = '12:00';
      break;
    case '13:00':
      timeOut.value = '13:00';
      break;
    case '14:00':
      timeOut.value = '14:00';
  }
}

/**
 * Изменение времени заезда в завсимости от вермени выезда
 */
function onSelectTimeOutChange() {
  switch (timeOut.value) {
    case '12:00':
      timeIn.value = '12:00';
      break;
    case '13:00':
      timeIn.value = '13:00';
      break;
    case '14:00':
      timeIn.value = '14:00';
  }
}

/**
 * Изменнение количества гостей в зависимости от типа жилья
 */
function onRoomNumberChange() {
  var capacity = findElement('#capacity');

  switch (roomNumber.value) {
    case '1':
      capacity.children[0].disabled = true;
      capacity.children[1].disabled = true;
      capacity.children[2].disabled = false;
      capacity.children[3].disabled = true;
      capacity.value = '1';
      break;
    case '2':
      capacity.children[0].disabled = true;
      capacity.children[1].disabled = false;
      capacity.children[2].disabled = false;
      capacity.children[3].disabled = true;
      if (capacity.value === '0' || capacity.value === '3') {
        capacity.value = '2';
      }
      break;
    case '3':
      capacity.children[0].disabled = false;
      capacity.children[1].disabled = false;
      capacity.children[2].disabled = false;
      capacity.children[3].disabled = true;
      if (capacity.value === '0') {
        capacity.value = '3';
      }
      break;
    case '100':
      capacity.children[0].disabled = true;
      capacity.children[1].disabled = true;
      capacity.children[2].disabled = true;
      capacity.children[3].disabled = false;
      capacity.value = '0';
  }
}

/**
 * Удаление элемента из родительского элемента
 * @param {Element} elem родительский класс
 */
function removeChildFromDom(elem) {
  elem.remove();
}

/**
 * Сброс страницы
 */
function onResetButtonMouseup() {
  var map = findElement('.map');
  var adForm = findElement('.ad-form');
  var mapFilters = findElement('.map__filters');
  var mapPinMain = findElement('.map__pin--main');
  var address = findElement('#address');
  var mapCard = findElement('.map__card');

  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  adForm.reset();
  noticeDisabled(true);
  mapFilters.classList.add('ad-form--disabled');
  address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;

  removeChildFromDom(mapCard);

  var mapPins = findElementAll('.map__pin');
  for (var i = 1; i < mapPins.length; i++) {
    removeChildFromDom(mapPins[i]);
  }
}

var widthMapPins = document.querySelector('.map__pins').offsetWidth; // Ширина окна
var pins = createArrayPins(widthMapPins);

noticeDisabled(true);
var mapPinMain = findElement('.map__pin--main');
var address = findElement('#address');
address.value = mapPinMain.offsetLeft + ', ' + mapPinMain.offsetTop;
mapPinMain.addEventListener('mouseup', onPinMainMouseup);
mapPinMain.addEventListener('mousedown', onPinMainMousedown);

var typeOfHousing = findElement('#type');
typeOfHousing.addEventListener('change', onSelectTypeChange);

var timeIn = findElement('#timein');
var timeOut = findElement('#timeout');
timeIn.addEventListener('change', onSelectTimeInChange);
timeOut.addEventListener('change', onSelectTimeOutChange);

var roomNumber = findElement('#room_number');
roomNumber.addEventListener('change', onRoomNumberChange);

var resetButton = findElement('.ad-form__reset');
resetButton.addEventListener('mouseup', onResetButtonMouseup)
