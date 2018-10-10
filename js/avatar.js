'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  /**
   * Загрузка фотографии. Если тип загружаемого файла соответсвует 'gif', 'jpg', 'jpeg', 'png', то в scr тега img записывается путь к фотографии.
   * @param {element} fileChooser input с типом file
   * @param {element} image DOM элемент, куда будет загружена фотография
   */
  function uploadImage(fileChooser, image) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  }

  /**
   * Создание элемента div, внутри которого лежит img. Для отображения загруженных фотографий объекта
   * @return {HTMLElement}
   */
  function createDiv() {
    var div = document.createElement('div');
    div.classList.add('ad-form__photo');
    div.classList.add('free');
    var img = document.createElement('img');
    img.alt = 'Фото';
    img.width = 70;
    img.height = 70;
    div.appendChild(img);

    return div;
  }

  var fileChooserPreview = window.keksobooking.utils.findElement('.ad-form__field input[type=file]');
  var preview = window.keksobooking.utils.findElement('.ad-form-header__preview img');
  var fileChooserPhoto = window.keksobooking.utils.findElement('.ad-form__upload input[type=file]');
  var photoContainer = window.keksobooking.utils.findElement('.ad-form__photo-container');

  fileChooserPreview.addEventListener('change', function () {
    uploadImage(fileChooserPreview, preview);
  });

  fileChooserPhoto.addEventListener('change', function () {
    var busyPhoto = window.keksobooking.utils.findElement('.ad-form__photo.free');
    if (busyPhoto) {
      busyPhoto.classList.remove('free');
      busyPhoto.classList.add('busy');
    }

    photoContainer.appendChild(createDiv());
    var photo = window.keksobooking.utils.findElement('.ad-form__photo.free img');

    uploadImage(fileChooserPhoto, photo);
  });

})();
