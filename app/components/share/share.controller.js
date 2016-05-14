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
    .controller('Share', Share);

  Share.$inject = [
    '$stateParams', 
    'ShareService'
  ];

  function Share (
    $stateParams, 
    ShareService
  ) {
    var vm = this;
    vm.loading = true;

    init();

    function init () {
      // Get set list from server
      ShareService.getShare($stateParams.shareID, initialize);
      
    }

    // Initialize the data for the view
    function initialize (setList) {
      vm.setList = setList;      

      // Hide spinners
      vm.loading = false;

    }

  }

})();
