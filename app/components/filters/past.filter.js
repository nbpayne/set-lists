(function() {
  'use strict';

  /**
   * @ngdoc function
   * @name SetListApp.filter:past
   * @description
   * # past
   * Filter of the SetListApp
   */

  angular
  .module('SetListApp')
  .filter('past', function () {
    return function (items) {
      var filtered = [];
      angular.forEach(items, function (item) {
        if (Date.parse(item.date) < Date.parse(Date())) { filtered.push(item); }
      });
      return filtered;
    };
  });

})();

