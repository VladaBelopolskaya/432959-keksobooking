'use strict';

(function () {
  var PIN_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  /**
   * Создание блока с фотографиями и заполнение их src
   * @param {array} array массив src для фотографий
   * @param {Node} nodeForClone элемент, на основе которого будут созаваться блоки с фотографиями
   * @return {DocumentFragment} фрагмент с готовыми фотографиями для последующей отрисовки в доме
   */
  function createPhotos(array, nodeForClone) {
    var fragmentPhoto = document.createDocumentFragment();
    array.forEach(function (item) {
      var newPhoto = nodeForClone.cloneNode(true);
      newPhoto.src = item;
      fragmentPhoto.appendChild(newPhoto);
    });
    return fragmentPhoto;
  }

  /**
   * Создание и заполнение карточкии
   * @param {Element} arrayElement элемант массива, на основе которого надо сделать карточку
   * @return {Node} карточка, описывающая соответсвующий пин
   */
  window.keksobooking.createСard = function (arrayElement) {
    var templateCard = window.keksobooking.utils.findElementTemplate('#card', 'article');
    var newElementCard = templateCard.cloneNode(true);
    var typeOfferEng = arrayElement.offer.type;
    var numberOfRooms = arrayElement.offer.rooms;
    var wordForm = '';
    var typeOfferRus = {
      'flat': 'Квартира',
      'bungalo': 'Бунгало',
      'house': 'Дом',
      'palace': 'Дворец',
    };

    var features = arrayElement.offer.features;

    // Поиск признаков, которых нет в объявлении, чтобы в последующем удалить их из разметки
    var deleteFeatures = PIN_FEATURES.filter(function (itemAllFeatures) {
      return features.indexOf(itemAllFeatures) === -1;
    });

    deleteFeatures.forEach(function (item) {
      newElementCard.querySelector('.popup__features > .popup__feature--' + item).remove();
    });

    if (numberOfRooms % 10 === 1) {
      wordForm = 'комната';
    } else if (numberOfRooms % 10 === 2 || numberOfRooms % 10 === 3 || numberOfRooms % 10 === 4) {
      wordForm = 'комнаты';
    } else {
      wordForm = 'комнат';
    }

    newElementCard.querySelector('.popup__title').textContent = arrayElement.offer.title;
    newElementCard.querySelector('.popup__text--address').textContent = arrayElement.offer.addres;
    newElementCard.querySelector('.popup__text--price').textContent = arrayElement.offer.price + '₽/ночь';
    newElementCard.querySelector('.popup__type').textContent = typeOfferRus[typeOfferEng];
    newElementCard.querySelector('.popup__text--capacity').textContent = arrayElement.offer.rooms + ' ' + wordForm + ' для ' + arrayElement.offer.guests + ' гостей';
    newElementCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + arrayElement.offer.checkin + ' выезд до ' + arrayElement.offer.checkout;
    newElementCard.querySelector('.popup__description').textContent = arrayElement.offer.description;
    newElementCard.querySelector('.popup__avatar').src = arrayElement.author.avatar;

    var nodeForClone = newElementCard.querySelector('.popup__photos > .popup__photo');
    var fragmentPhoto = createPhotos(arrayElement.offer.photos, nodeForClone);
    nodeForClone.remove();
    newElementCard.querySelector('.popup__photos').appendChild(fragmentPhoto);

    return newElementCard;
  };
})();

