(function() {

    // Mock User Service
    var UserServiceMock = angular.module('UserServiceMock', []);

    UserServiceMock.service('UserService', function () {
      return {
        isLoggedIn: true, 
        name: 'Nick Payne',
        band: 'Dear Orphans', 
        songListID: '52d24a43e4756a43c269a82c', 
        login: function(callback) {
          
        }, 
        logout: function (callback) {

        }
      }
    });
    
})();
