'use strict';

(function () {
  var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  /**
   * Создание и заполнение карточкии
   * @param {Element} arrayElement элемант массива, на основе которого надо сделать карточку
   * @return {Element} карточка, описывающая соответсвующий пин
   */
  window.keksobooking.createСard = function (arrayElement) {
    var templateCard = window.keksobooking.utils.findElementTemplate('#card', 'article');
    var newElementCard = templateCard.cloneNode(true);
    var typeOfferEng = arrayElement.offer.type;
    var numberOfRooms = arrayElement.offer.rooms;
    var declination = '';
    var typeOfferRus = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец'
    };

    var features = arrayElement.offer.features;

    //Поиск признаков, которых нет в объявлении, чтобы в последующем удалить их из разметки
    var deleteFeatures = PIN_FEATURES.filter(function (itemAllFeatures) {
      return features.indexOf(itemAllFeatures) === -1;
    });

    deleteFeatures.forEach(function (item) {
      newElementCard.querySelector('.popup__features > .popup__feature--' + item).remove();
    });

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
    newElementCard.querySelector('.popup__type').textContent = typeOfferRus[typeOfferEng];
    newElementCard.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' ' + declination + ' для ' + arrayElement.offer.guests + ' гостей';
    newElementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ' выезд до ' + arrayElement.offer.checkout;
    newElementCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
    newElementCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;


    var fragmentPhoto = document.createDocumentFragment();
    //Используется цикл до length - 1, так как в исходной разметке template уже есть один элемент с классом "popup__photo"
    for (var i = 0; i < arrayElement.offer.photos.length - 1; i++) {
      var newPhoto = newElementCard.querySelector('.popup__photos > .popup__photo').cloneNode(true);
      fragmentPhoto.appendChild(newPhoto);
    }
    newElementCard.querySelector('.popup__photos').appendChild(fragmentPhoto);

    var arrayPhotos = newElementCard.querySelectorAll('.popup__photos > .popup__photo');
    arrayPhotos.forEach(function (item, j) {
      item.src = arrayElement.offer.photos[j];
    });

    return newElementCard;
  };
})();

