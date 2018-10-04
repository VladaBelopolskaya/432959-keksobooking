'use strict'

var URL_SEND = 'https://js.dump.academy/keksobooking';
var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

window.keksobooking.upload = function (data, onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  xhr.addEventListener('load', function () {
    if (xhr.status !== 500) {
      onLoad(xhr.response);
    } else {
      onError();
    }
  });

  xhr.open('POST', URL_SEND);
  xhr.send(data);

};

window.keksobooking.loadPins = function (onLoad, onError) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
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

  xhr.timeout = 10000; // 10s
  xhr.open('GET', URL_LOAD);
  xhr.send();
};


