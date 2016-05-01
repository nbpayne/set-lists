(function() {
  'use strict';

  angular
    .module('SetListApp')
    .controller('Login', Login);

  Login.$inject = [ 
    'UserService',  
    '$window', 
    '$facebook', 
    'FB_APPID'
  ];

	// Login controller
  function Login (
    UserService, 
    $window, 
    $facebook, 
    FB_APPID
  ) {
    var vm = this;
    vm.login = login;

    function login () {
      $facebook.getLoginStatus().then(
        function (response) {
          if (response.status === 'connected') {
            UserService.login(response.authResponse);
          }
          else {
            $window.location.href = 'https://www.facebook.com/dialog/oauth?client_id=' + FB_APPID + 
              '&redirect_uri=' + $window.location.origin + $window.location.pathname;
          }
        },
        function (response) {
          console.log(response);
        }
      );
    }

  }

})();