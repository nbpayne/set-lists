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
    vm.logout = logout;
    vm.version = VERSION;

    function logout () {
      UserService.logout(function() { return; });
    }
    
  }

})();
