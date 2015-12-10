(function() {
  'use strict';

/**
 * @ngdoc function
 * @name SetListApp.controller:Index
 * @description
 * # Index
 * Controller of the SetListApp
 */

  angular
    .module('SetListApp')
    .controller('Index', Index);

  Index.$inject = [
    '$location', 
    '$scope'
  ];

  function Index($location, $scope) {
    var vm = this;
    vm.location = undefined; // = $location.absUrl();

    // Listen for changes to location
    $scope.$on('$locationChangeSuccess', locationChangeSuccess);


    function locationChangeSuccess (angularEvent, newUrl) {
      vm.location = newUrl;
    }
  }

})();
