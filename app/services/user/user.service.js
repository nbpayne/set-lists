(function() {
  'use strict';

  angular
  .module('SetListApp')
  .service('UserService', UserService);

  UserService.$inject = [
    'AuthorizationResource', 
    '$http', 
    '$rootScope'
  ];

  function UserService (AuthorizationResource, $http, $rootScope) {
    
    return {
      user: user,
      login: login, 
      logout: logout
    };

    function user () {
      var authorization = angular.fromJson(localStorage['authorization']);
      if (authorization) {
        $http.defaults.headers.common['auth-token'] = authorization.authToken;
        return { 
          isLoggedIn: true, 
          name: authorization.firstName + ' ' + authorization.lastName,
          band: authorization.band,
          songListID: authorization.songListID
        };
      } else {
        return {
          isLoggedIn: false,
          name: undefined,
          band: undefined,
          songListID: undefined
        };
      }
    }

    function login (authResponse) {

      AuthorizationResource.get({ accessToken: authResponse.accessToken}, function (data) {
        // Save to local storage
        localStorage['authorization'] = angular.toJson(data);
        $rootScope.$broadcast('authenticate', { 'authenticated': true });
      }, function (response) {
        console.log(response);
      });
    }

    function logout () {
      var authorization = angular.fromJson(localStorage['authorization']);
      if (!authorization) {
        return;
      }

      localStorage.removeItem('authorization');
      
      AuthorizationResource.delete({ accessToken: '4321'}, function (data) {
        //console.log('Authorization deleted from server');
        delete $http.defaults.headers.common['auth-token'];
        $rootScope.$broadcast('authenticate', { 'authenticated': false });
      }, function (response) {
        console.log(response);
        delete $http.defaults.headers.common['auth-token'];
        $rootScope.$broadcast('authenticate', { 'authenticated': false });
      });
    }

  }

})();
