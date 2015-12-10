(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name SetListApp.filter:future
   * @description
   * # future
   * Filter of the SetListApp
   */

  angular
  .module('SetListApp')
  .filter('future', function () {
    return function (items) {
      var filtered = [];
      angular.forEach(items, function (item) {
        if (Date.parse(item.date) >= Date.parse(Date())) { filtered.push(item); }
      });
      return filtered;
    };
  });

})();