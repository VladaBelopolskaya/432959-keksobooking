'use strict';

var PIN_TITLE = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var PIN_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PIN_TIME = ['12:00', '13:00', '14:00'];
var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PIN_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var arrayPins = [];
var widthMapPins = document.querySelector('.map__pins').offsetWidth;

// Функция: выбор случайного числа
var randomInteger = function (min, max) {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

// Функция: случайный порядок массива
function compareRandom() {
  return Math.random() - 0.5;
}

// Заполнение массива данных
for (var i = 0; i < 8; i++) {
  var number = i + 1;
  var locatoinX = randomInteger(0, widthMapPins);
  var locationY = randomInteger(130, 630);
  var arrayFeatures = [];
  for (var j = 0; j <= randomInteger(0, 5); j++) {
    arrayFeatures[j] = PIN_FEATURES[j];
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

// Создание пина
var templatePin = document.querySelector('#pin').content.querySelector('button');
var mapPins = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

for (var j = 0; j < 8; j++) {
  var newElement = templatePin.cloneNode(true);
  newElement.style.cssText = 'left: ' + arrayPins[j].location.x + 'px; top: ' + arrayPins[j].location.y + 'px;';
  newElement.children[0].src = arrayPins[j].author.avatar;
  newElement.children[0].alt = arrayPins[j].offer.title;
  fragment.appendChild(newElement);
}

mapPins.appendChild(fragment);

// Создание карточки
var templateCard = document.querySelector('#card').content.querySelector('article');
var map = document.querySelector('.map');
var mapFilters = document.querySelector('.map__filters-container');

var newElementCard = templateCard.cloneNode(true);

var typeOfferEng = arrayPins[0].offer.type;
var typeOfferRus = '';

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
newElementCard.querySelector('.popup__photos');
newElementCard.querySelector('.popup__avatar').src = arrayPins[0].author.avatar;

  // В список .popup__features выведите все доступные удобства в объявлении.
  // В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.




map.insertBefore(newElementCard, mapFilters);

// element.children[0].textContent = i;

