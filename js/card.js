'use strict';

/**
 * Создание и заполнение карточкии
 * @param {Element} arrayElement элемант массива, на основе которого надо сделать карточку
 * @return {Element} новый элемент
 */
window.createСard = function (arrayElement) {
  var templateCard = window.findElementTemplate('#card', 'article');
  var newElementCard = templateCard.cloneNode(true);
  var typeOfferEng = arrayElement.offer.type;
  var typeOfferRus = '';
  var numberOfRooms = arrayElement.offer.rooms;
  var declination = '';

  var outFeatures = [];
  for (var k = arrayElement.offer.features.length; k < window.data.PIN_FEATURES.length; k++) {
    outFeatures.push(window.data.PIN_FEATURES[k]);
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
  for (var i = 0; i < window.data.PIN_PHOTOS.length - 1; i++) {
    var newPhoto = newElementCard.querySelector('.popup__photos > .popup__photo').cloneNode(true);
    fragmentPhoto.appendChild(newPhoto);
  }
  newElementCard.querySelector('.popup__photos').appendChild(fragmentPhoto);

  var arrayPhotos = newElementCard.querySelectorAll('.popup__photos > .popup__photo');
  for (var j = 0; j < window.data.PIN_PHOTOS.length; j++) {
    arrayPhotos[j].src = window.data.PIN_PHOTOS[j];
  }

  return newElementCard;
};
