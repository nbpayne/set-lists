(function() {

    // Mock User Service
    var UserServiceMock = angular.module('UserServiceMock', []);

    UserServiceMock.service('UserService', function () {
      return {
        user: function () {
            return {
                isLoggedIn: true, 
                name: 'Nick Payne',
                band: 'Dear Orphans', 
                songListID: 'test-1'   
            };
        }, 
        login: function(callback) {
          
        }, 
        logout: function (callback) {

        }
      };
    });
    
})();
