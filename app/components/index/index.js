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
    '$scope', 
    'UserService'
  ];

  function Index($scope, UserService) {
    var vm = this;
    vm.location = undefined; // = $location.absUrl();
    vm.logout = logout;
    vm.user = UserService.user();

    // Listen for changes to location
    $scope.$on('$locationChangeSuccess', locationChangeSuccess);

    // Listen for authentication
    $scope.$on('authenticate', function (event, args) {
      vm.user = UserService.user();
    });

    function locationChangeSuccess (angularEvent, newUrl) {
      vm.location = newUrl;
    }

    function logout () {
      UserService.logout(function() { return; });
    }
  }

})();
