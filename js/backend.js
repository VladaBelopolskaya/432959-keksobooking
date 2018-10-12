'use strict';

(function () {
  var URL_SEND = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var SUCCESS = 200;
  var TIMEOUT = 10000;

  function setXhr(defTimeout, method, url, onLoad, onError, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = defTimeout;
    xhr.open(method, url);
    xhr.send(data);

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  }

  window.keksobooking.upload = function (data, onLoad, onError) {
    setXhr(0, 'POST', URL_SEND, onLoad, onError, data);
  };

  window.keksobooking.loadPins = function (onLoad, onError) {
    setXhr(TIMEOUT, 'GET', URL_LOAD, onLoad, onError);
  };
})();
