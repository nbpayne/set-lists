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
      logout: logout, 
      finishTour: finishTour
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
          songListID: authorization.songListID, 
          toured: authorization.toured || []
        };
      } else {
        return {
          isLoggedIn: false,
          id: undefined, 
          name: undefined,
          band: undefined,
          songListID: undefined, 
          toured: []
        };
      }
    }

    function login (authResponse) {
      AuthorizationResource.get({ accessToken: authResponse.accessToken}, function (data) {
        // Save to local storage
        localStorage['authorization'] = angular.toJson(data);
        $rootScope.$broadcast('authenticate', { 'authenticated': true });
      }, function (response) {
        Rollbar.warning('login failed to get the authorization from the server', response);
      });
    }

    function logout () {
      var authorization = angular.fromJson(localStorage['authorization']);
      if (authorization) {
        localStorage.removeItem('authorization');
      }
      
      //AuthorizationResource.delete({ accessToken: authorization.authToken }, function (data) {
        delete $http.defaults.headers.common['auth-token'];
        $rootScope.$broadcast('authenticate', { 'authenticated': false });
      //}, function (response) {
      //  console.log(response);
      //  delete $http.defaults.headers.common['auth-token'];
      //  $rootScope.$broadcast('authenticate', { 'authenticated': false });
      //});
    }

    function finishTour(state) {
      var user = angular.fromJson(localStorage['authorization']);
      if (user === undefined) {
        $rootScope.$broadcast('authorize', { 'authorized': false });
      } else {
        if(user.toured === undefined) {
          user.toured = [];
        }
        if(user.toured.indexOf(state) < 0) {
          user.toured.push(state);
          localStorage['authorization'] = angular.toJson(user);
        }
        //Rollbar.info('Tour finished');
      }
    }

  }

})();
