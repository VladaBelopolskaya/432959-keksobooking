'use strict';

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
  for (var j = 0; j < fieldsetNotice.length; j++) {
    fieldsetNotice[j].disabled = argument;
  }
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
