(function() {
  'use strict';

  angular
  .module('SetListApp')
  .factory('SongListResource', SongListResource);

  SongListResource.$inject = [
    '$resource', 
    'API'
  ];

  function SongListResource ($resource, API) {
    return $resource(API + '/song-lists/:songListID', {}, { update: { method: 'PUT' } });
  }

})();