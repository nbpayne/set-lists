(function() {
  'use strict';

  angular
    .module('SetListApp')
    .controller('Authorize', Authorize);

  Authorize.$inject = [
    'UserService', 
    '$facebook', 
    'FB_APPID'
  ];

	// Authorize controller
  function Authorize (
    UserService, 
    $facebook, 
    FB_APPID
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
          console.log(response);
        }
      );
    }

  }

})();