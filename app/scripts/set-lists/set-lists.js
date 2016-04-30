(function() {
  'use strict';

/**
 * @ngdoc function
 * @name SetListApp.controller:SetLists
 * @description
 * # MainCtrl
 * Controller of the SetListApp
 */

  angular
    .module('SetListApp')
    .controller('SetLists', SetLists);

  SetLists.$inject = [
    '$log', 
    '$uibModal',
    '$scope', 
    '$state',  
    'futureFilter',
    'ObjectIdService', 
    'orderByFilter', 
    'SetListService', 
    'SynchronisationService', 
    'UserService'];

  function SetLists (
    $log, 
    $uibModal,
    $scope, 
    $state, 
    futureFilter, 
    ObjectIdService, 
    orderByFilter, 
    SetListService, 
    SynchronisationService, 
    UserService
  ) {
    var vm = this;
    vm.setLists = { data: [] };
    vm.createSetList = createSetList;
    vm.deleteSetList = deleteSetList;
    vm.reallyCreateSetList = reallyCreateSetList;

    // Shutdown synchroniser
    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      SynchronisationService.stopSetListsSynchroniser();
    });
    
    // Get the list of set lists
    SetListService.getSetLists(initialize);

    // Start synchroniser
    SynchronisationService.startSetListsSynchroniser();

    function initialize (setLists) {
      vm.setLists = setLists;
    }

    // Create a new set list
    function createSetList () {

      var modalInstance = $uibModal.open({
        templateUrl: 'scripts/set-list-modal/set-list-modal.html', 
        controller: 'SetListModal as vm', 
        resolve: {
          setList: function () {
            return {};
          }
        }
      });

      modalInstance.result.then(reallyCreateSetList, cancel);

      function cancel (reason) {
        //$log.info(reason);
      }
      
    }

    function deleteSetList (i) {
      var tmp = futureFilter(
        orderByFilter(vm.setLists.data, 'date')
      );
      SetListService.deleteSetList(tmp[i]._id);
      vm.setLists.data.splice(vm.setLists.data.indexOf(tmp[i]), 1);
    }

    function reallyCreateSetList (setList) {
      // Add new set list to set lists
      var newSetList = {};
      newSetList.data = {};
      newSetList.data._id = ObjectIdService.getObjectId();
      newSetList.data.venue = setList.venue;
      newSetList.data.date = setList.date;
      vm.setLists.data.push(newSetList.data);

      // Save to local storage
      SetListService.saveSetLists(vm.setLists);

      // Add songs to set list
      newSetList.data.songListID = UserService.songListID;
      newSetList.data.songs = [];

      // Save set list to local storage
      SetListService.saveSetList(newSetList, true);

      // Open the set list page
      $state.transitionTo('set-list', {'setListID': newSetList.data._id });
    }

  }

})();
