(function() {
  'use strict';

  angular
  .module('SetListApp')
  .factory('ShareResource', ShareResource);

  ShareResource.$inject = [
    '$resource', 
    'API'
  ];

  function ShareResource ($resource, API) {
    return $resource(API + '/shares/:shareID');
  }
  
})();
