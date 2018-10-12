'use strict';

(function () {
  /**
   * Поиск элемента в DOM template
   * @param {string} id айди template
   * @param {string} tag тэг внутри template, который хотим клонировать
   * @return {Element} новый элемент
   */
  window.keksobooking.utils.findElementTemplate = function (id, tag) {
    return document.querySelector(id).content.querySelector(tag);
  };

  /**
   * Поиск элемента по классу / id
   * @param {string} classElement класс элемента
   * @return {Element}
   */
  window.keksobooking.utils.findElement = function (classElement) {
    return document.querySelector(classElement);
  };

  /**
   * Поиск всех элементов по классу / id
   * @param {string} classElements класс элемента
   * @return {NodeListOf<Element>}
   */

  window.keksobooking.utils.findElementAll = function (classElements) {
    return document.querySelectorAll(classElements);
  };

  /**
   * Удаление элемента из родительского элемента
   * @param {Element} elem родительский класс
   */
  window.keksobooking.utils.removeChildFromDom = function (elem) {
    elem.remove();
  };

  /**
   * Блокирует/разблокирует поля fielset внутри класса notice
   * @param {boolean} argument добавлять ли аргумент disabled fielset
   */
  window.keksobooking.utils.noticeDisabled = function (argument) {
    var fieldsetNotice = window.keksobooking.utils.findElementAll('.notice fieldset');
    fieldsetNotice.forEach(function (element) {
      element.disabled = argument;
    });
  };

  /**
   * Добавление нового элемента в родительский элемент
   * @param {string} parentClass родительский класс
   * @param {Element} newChild новый дочерний элемент
   */
  window.keksobooking.utils.addChildtoDom = function (parentClass, newChild) {
    document.querySelector(parentClass).appendChild(newChild);
  };

  /**
   * Добавление нового элемента перед другим элементом
   * @param {string} parentClass родительский класс
   * @param {string} elementBeforeClass класс следующего элемента
   * @param {Element} newElement новый  элемент
   */
  window.keksobooking.utils.addElementToDomBefore = function (parentClass, elementBeforeClass, newElement) {
    document.querySelector(parentClass).insertBefore(newElement, document.querySelector(elementBeforeClass));
  };

  /**
   * Удаление всех пинов, кроме главного с карты
   */
  window.keksobooking.utils.deletePinsFromMap = function () {
    var mapPins = window.keksobooking.utils.findElementAll('.map__pin');
    // Цикл не с 0 эелмента, а с 1ого, так как нулевой элемент - это самый главный пин, его мы не должны удалять
    for (var i = 1; i < mapPins.length; i++) {
      window.keksobooking.utils.removeChildFromDom(mapPins[i]);
    }
  };

  /**
   * Скрытие модального окна (ошибка / успешная загрузка) при нажатии на ESC или произвольную область
   * @param {Element} element на который нужно навесить обработчик
   */
  window.keksobooking.listnerClosePopup = function (element) {
    element.addEventListener('mouseup', function () {
      window.keksobooking.utils.removeChildFromDom(element);
    });

    /**
     * Закрытие при нажатии на кнопку ESC
     * @param {event} evnt
     */
    function onDocumentKeydown(evnt) {
      if (evnt.keyCode === window.keksobooking.ESC_CODE) {
        window.keksobooking.utils.removeChildFromDom(element);
      }
      document.removeEventListener('keydown', onDocumentKeydown);
    }

    document.addEventListener('keydown', onDocumentKeydown);
  };

  /**
   * Не успешная загрузка
   * @param {text} message текст ошибки
   */
  window.keksobooking.utils.errorLoad = function (message) {
    var templateError = window.keksobooking.utils.findElementTemplate('#error', 'div');
    var newElement = templateError.cloneNode(true);
    newElement.children[0].textContent = message;
    document.body.insertAdjacentElement('afterbegin', newElement);

    window.keksobooking.listnerClosePopup(newElement);
  }
})();
