(function() {
  'use strict';

  angular
  .module('SetListApp')
  .factory('AuthorizationResource', AuthorizationResource);

  AuthorizationResource.$inject = [
    '$resource', 
    'API'
  ];

  function AuthorizationResource ($resource, API) {
    return $resource(API + '/authorizations/:accessToken');
  }
  
})();
