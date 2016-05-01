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
    'UserService',
    'VERSION'
  ];

  function Index($scope, UserService, VERSION) {
    var vm = this;
    vm.location = undefined; // = $location.absUrl();
    vm.logout = logout;
    //vm.user = UserService.user();
    vm.version = VERSION;

    // Listen for changes to location
    $scope.$on('$locationChangeSuccess', locationChangeSuccess);

    function locationChangeSuccess (angularEvent, newUrl) {
      vm.location = newUrl.split('?')[0];
    }

    function logout () {
      UserService.logout(function() { return; });
    }
  }

})();
