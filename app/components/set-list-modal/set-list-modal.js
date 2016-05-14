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
  .controller('SetListModal', SetListModal);

  SetListModal.$inject = [
    '$uibModalInstance', 
    '$moment', 
    'setList'
  ];

  function SetListModal ($uibModalInstance, $moment, setList) {
    var vm = this;
    vm.venue = setList.venue;
    if (setList.date) {
      vm.date = $moment(setList.date)._d;
    }
    vm.ok = ok;
    vm.cancel = cancel;

    function ok () {
      setList.venue = vm.venue;
      setList.date = $moment(vm.date).format();
      $uibModalInstance.close(setList);
    }

    function cancel () {
      $uibModalInstance.dismiss();
    }

  }

})();