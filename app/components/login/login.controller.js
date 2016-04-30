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
    $scope.authenticated = UserService.isLoggedIn;
    
    // Listen for authentication coming back from FB
    $scope.$on('authenticate', function (event, args) {
      $scope.authenticated = args.authenticated;
    });

    // Force parse of xfbml
    $facebook.parse();

  }

})();