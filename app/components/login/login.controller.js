(function() {
  'use strict';

  angular
    .module('SetListApp')
    .controller('Login', Login);

  Login.$inject = [
    '$scope', 
    'UserService', 
    '$state', 
    '$window', 
    '$facebook'
  ];

	// Login controller
  function Login (
    $scope, 
    UserService, 
    $state, 
    $window, 
    $facebook
  ) {
    var vm = this;
    vm.user = UserService.user();
    
    // Listen for authentication coming back from FB
    $scope.$on('authenticate', function (event, args) {
      vm.user = UserService.user();
    });

    // Force parse of xfbml
    $facebook.parse();

  }

})();