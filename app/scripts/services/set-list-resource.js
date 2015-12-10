(function() {
  'use strict';

  angular
  .module('SetListApp')
  .factory('SetListResource', SetListResource);

  SetListResource.$inject = [
    '$resource', 
    'API'
  ];

  function SetListResource ($resource, API) {
    return $resource(API + '/set-lists/:setListID', {}, { update: { method: 'PUT' } });
  }
  
})();
