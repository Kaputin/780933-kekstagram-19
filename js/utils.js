'use strict';
(function () {

  window.util = {
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter',

    hasRepeatingElement: function (elem, pos, arr) {
      return pos !== arr.indexOf(elem) || pos !== arr.lastIndexOf(elem);
    },

    getRandomArray: function (arr) { // создаем функцию для случайного тасования множества (Тасование Фишера — Йетса)
      var randomArr = arr.slice();
      for (var i = randomArr.length - 1; i > 0; i--) { // проходим по массиву в обратном порядке
        var j = Math.floor(Math.random() * i); // задаем случайный индекс от 0 до i
        var temp = randomArr[i]; // меняем местами каждый элемент со случайным элементом, который находится перед ним
        randomArr[i] = randomArr[j];
        randomArr[j] = temp;
      }
      return randomArr; // возвращаем перетасованный массив
    },

    getRandomArrayElement: function (arr) {
      var rand = Math.floor(Math.random() * arr.length);
      return arr[rand];
    },

    getRandomNumber: function (min, max) {
      return Math.floor(min + Math.random() * (max - min));
    }

  };
})();
