document.addEventListener("DOMContentLoaded", function () {
  document.querySelector('[href="#openModal"]').click();
});

("use strict");
var multiItemSlider = (function () {

  return function (selector, config) {
    var _mainElement = document.querySelector(selector), // основный элемент блока
      _sliderWrapper = _mainElement.querySelector(".slider__wrapper"), // обертка для .slider-item
      _sliderItems = _mainElement.querySelectorAll(".slider__item"), // элементы (.slider-item)
      _sliderControls = _mainElement.querySelectorAll(".slider__control"), // элементы управления
      _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
      _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента
      _positionLeftItem = 0, // позиция левого активного элемента
      _transform = 0, // значение транфсофрмации .slider_wrapper
      _step = (_itemWidth / _wrapperWidth) * 100, // величина шага (для трансформации)
      _items = []; // массив элементов
    // наполнение массива _items
    _sliderItems.forEach(function (item, index) {
      _items.push({ item: item, position: index, transform: 0 });
    });

    var position = {
      getMin: 0,
      getMax: _items.length - 1,
    };

    var _transformItem = function (direction) {
      if (direction === "right") {
        if (_positionLeftItem == 0) {
          _positionLeftItem += 2;
          _transform -= _step * 2;
        } else if (_positionLeftItem == 1) {
          _positionLeftItem++;
          _transform -= _step;
        }
      }

      if (direction === "left") {
        if (_positionLeftItem <= position.getMin) {
          return;
        }
        if (_positionLeftItem == 1) {
          _positionLeftItem--;
          _transform += _step;
        } else {
          _positionLeftItem -= 2;
          _transform += _step * 2;
        }
      }
      if (direction === "center") {
        if (_positionLeftItem === 2) {
          _positionLeftItem -= 1;
          _transform += _step;
        }

        if (_positionLeftItem === 0) {
          _positionLeftItem += 1;
          _transform -= _step;
        }
      }
      _sliderWrapper.style.transform = "translateX(" + _transform + "%)";
    };

    // обработчик события click для кнопок "назад" и "вперед"
    var _controlClick = function (e) {
      if (e.target.classList.contains("slider__control")) {
        e.preventDefault();
        var direction = e.target.classList.contains("slider__control_right")
          ? "right"
          : (direction = e.target.classList.contains("slider__control_left")
              ? "left"
              : "center");
        _transformItem(direction);
      }
    };

    var _setUpListeners = function () {
      // добавление к кнопкам обрботчика _controlClick для событя click
      _sliderControls.forEach(function (item) {
        item.addEventListener("click", _controlClick);
      });
    };

    // инициализация
    _setUpListeners();

    return {
      right: function () {
        // метод right
        _transformItem("right");
      },
      left: function () {
        // метод left
        _transformItem("left");
      },
      left: function () {
        // метод center
        _transformItem("center");
      },
    };
  };
})();

var slider = multiItemSlider(".slider");

var headers = document.querySelectorAll('h3');

headers.forEach(function(elem){
  elem.addEventListener('click', function(e){
    e.preventDefault();
    e.target.nextElementSibling.classList.toggle('imVisible');
    e.target.classList.toggle('violet');
  });

  elem.nextElementSibling.addEventListener('click', function(){
    this.classList.toggle('imVisible');
    elem.classList.toggle('violet');
  });
});
