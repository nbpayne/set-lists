(function() {
  'use strict';

  angular
  .module('SetListApp')
  .service('ShareService', ShareService);

  ShareService.$inject = [
    '$rootScope', 
    'Rollbar', 
    'ShareResource'
  ];

  function ShareService (
    $rootScope, 
    Rollbar, 
    ShareResource
  ) {
    return {
      getShare: getShare
    };

    function getShare (shareID, callback) {
      console.log('Get set list from the server');
      ShareResource.get({ shareID: shareID }, function(data) {
        var setList = {};
        setList.data = data;
        callback(setList);
      }, function (response) {
        callback(undefined);
        Rollbar.warning('getShare failed to get set list', response);
      });
    }

  }

})();
