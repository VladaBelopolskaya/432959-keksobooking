'use strict';

(function () {
  var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  /**
   * Создание и заполнение карточкии
   * @param {Element} arrayElement элемант массива, на основе которого надо сделать карточку
   * @return {Element} новый элемент
   */
  window.keksobooking.createСard = function (arrayElement) {
    var templateCard = window.keksobooking.utils.findElementTemplate('#card', 'article');
    var newElementCard = templateCard.cloneNode(true);
    var typeOfferEng = arrayElement.offer.type;
    var typeOfferRus = '';
    var numberOfRooms = arrayElement.offer.rooms;
    var declination = '';

    var features = arrayElement.offer.features;
    var deleteFeatures = [];

    for (var i = 0; i < PIN_FEATURES.length; i++) {
      var a = 0;
      for (var j = 0; j < features.length; j++) {
        if (PIN_FEATURES[i] !== features[j]) {
          a = a + 1;
        }
      }
      if (a === features.length) {
        deleteFeatures.push(PIN_FEATURES[i]);
      }
    }

    for (var m = 0; m < deleteFeatures.length; m++) {
      newElementCard.querySelector('.popup__features > .popup__feature--' + deleteFeatures[m]).remove();
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
    for (var i = 0; i < arrayElement.offer.photos.length - 1; i++) {
      var newPhoto = newElementCard.querySelector('.popup__photos > .popup__photo').cloneNode(true);
      fragmentPhoto.appendChild(newPhoto);
    }
    newElementCard.querySelector('.popup__photos').appendChild(fragmentPhoto);

    var arrayPhotos = newElementCard.querySelectorAll('.popup__photos > .popup__photo');
    for (var j = 0; j < arrayElement.offer.photos.length; j++) {
      arrayPhotos[j].src = arrayElement.offer.photos[j];
    }

    return newElementCard;
  };
})();

