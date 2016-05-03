(function() {
  'use strict';

  angular
    .module('SetListApp')
    .controller('Authorize', Authorize);

  Authorize.$inject = [
    '$facebook', 
    'FB_APPID',
    'UserService', 
    'Rollbar'
  ];

	// Authorize controller
  function Authorize (
    $facebook, 
    FB_APPID,
    UserService, 
    Rollbar
  ) {
    var vm = this;
    
    authorize();

    // Authorize the user
    function authorize () {
      $facebook.getLoginStatus().then(
        function (response) {
          if (response.status === 'connected') {
            UserService.login(response.authResponse);
          }
          else {
            UserService.logout();
          }
        },
        function (response) {
          Rollbar.error('$facebook.getLoginStatus failed to return a response', response);
        }
      );
    }

  }

})();