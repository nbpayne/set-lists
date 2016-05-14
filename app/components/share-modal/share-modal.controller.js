(function() {
  'use strict';

/**
 * @ngdoc function
 * @name SetListApp.controller:SetList
 * @description
 * # MainCtrl
 * Controller of the SetListApp
 */

  angular
      .module('SetListApp')
      .controller('ShareModal', ShareModal);

  ShareModal.$inject = [
    '$uibModalInstance', 
    'BASE_URL', 
    'share'
  ];

  function ShareModal ($uibModalInstance, BASE_URL, share) {
    var vm = this;
    vm.shareUrl = BASE_URL + '/share/' + share;
    vm.ok = ok;

    function ok () {
      $uibModalInstance.close();
    }

  }

})();