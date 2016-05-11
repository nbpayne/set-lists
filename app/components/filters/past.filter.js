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
  .filter('past', past);

  past.$inject = [
    '$moment'
  ];

  function past ($moment) {
    return function (items) {
      var filtered = [];
      angular.forEach(items, function (item) {
        //if (Date.parse(item.date) < Date.parse(Date())) { filtered.push(item); }
        if ($moment(item.date).isBefore($moment(), 'day')) {
          filtered.push(item);
        }
      });
      return filtered;
    };
  }

})();

