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
  .filter('future', future);

  future.$inject = [
    '$moment'
  ];

  function future ($moment) {
    return function (items) {
      var filtered = [];
      angular.forEach(items, function (item) {
        //if (Date.parse(item.date) >= Date.parse(Date())) { filtered.push(item); }
        if ($moment(item.date).isSameOrAfter($moment(), 'day')) {
          filtered.push(item);
        }
      });
      return filtered;
    };
  }

})();