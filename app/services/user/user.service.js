(function() {
  'use strict';

  angular
  .module('SetListApp')
  .service('UserService', UserService);

  UserService.$inject = [
    '$http', 
    '$rootScope',
    'AuthorizationResource', 
    'Rollbar'
  ];

  function UserService (
    $http, 
    $rootScope, 
    AuthorizationResource, 
    Rollbar
  ) {
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
          id: authorization._id, 
          name: authorization.firstName + ' ' + authorization.lastName,
          band: authorization.band,
          songListID: authorization.songListID
        };
      } else {
        return {
          isLoggedIn: false,
          id: undefined, 
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
        Rollbar.error('login failed to get the authorization from the server', response);
      });
    }

    function logout () {
      var authorization = angular.fromJson(localStorage['authorization']);
      if (!authorization) {
        return;
      }

      localStorage.removeItem('authorization');
      
      //AuthorizationResource.delete({ accessToken: authorization.authToken }, function (data) {
        delete $http.defaults.headers.common['auth-token'];
        $rootScope.$broadcast('authenticate', { 'authenticated': false });
      //}, function (response) {
      //  console.log(response);
      //  delete $http.defaults.headers.common['auth-token'];
      //  $rootScope.$broadcast('authenticate', { 'authenticated': false });
      //});
    }

  }

})();
