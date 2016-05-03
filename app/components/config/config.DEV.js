(function() {
  'use strict';

  angular.module('SetListApp.config', [])
    .constant('API', 'http://localhost:8001')
  	.constant('ENV', 'development')
    .constant('FB_APPID', '366409233500924')
    .constant('ROLLBAR_ID', 'cb9ce30fe9934a34b6e256c84fd4c029');

})();
