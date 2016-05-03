(function() {
  'use strict';

  angular
    .module('SetListApp')
    .controller('Login', Login);

  Login.$inject = [
    '$facebook', 
    '$window', 
    'FB_APPID',
    'Rollbar', 
    'UserService'
  ];

	// Login controller
  function Login (
    $facebook, 
    $window, 
    FB_APPID,
    Rollbar, 
    UserService
  ) {
    var vm = this;
    vm.loading = false;
    vm.login = login;

    function login () {
      vm.loading = true;
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
          Rollbar.warning('$facebook.getLoginStatus failed to return a response', response);
          vm.loading = false;
        }
      );
    }

  }

})();