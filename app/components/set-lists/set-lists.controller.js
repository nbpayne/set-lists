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
    '$uibModal',
    '$scope', 
    '$state',  
    'futureFilter',
    'ObjectIdService', 
    'orderByFilter', 
    'SetListService', 
    'SynchronisationService', 
    'uiTourService', 
    'UserService'];

  function SetLists (
  
    $uibModal,
    $scope, 
    $state, 
    futureFilter, 
    ObjectIdService, 
    orderByFilter, 
    SetListService, 
    SynchronisationService, 
    uiTourService, 
    UserService
  ) {
    var vm = this;
    vm.loading = true;
    vm.setLists = { data: [] };
    vm.createSetList = createSetList;
    vm.deleteSetList = deleteSetList;
    vm.reallyCreateSetList = reallyCreateSetList;

    init();

    function init () {
      // Shutdown synchroniser
      $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        SynchronisationService.stopSetListsSynchroniser();
      });
      
      // Get the list of set lists
      SetListService.getSetLists(initialize);

      // Start synchroniser
      SynchronisationService.startSetListsSynchroniser();

      // Kick off tour
      if (UserService.user().toured.indexOf('set-lists') < 0) { 
        var tour = uiTourService.getTour();
        if (tour) { 
          tour.start(); 
        }
      }
    }

    function initialize (setLists) {
      vm.setLists = setLists;
      vm.loading = false;
    }

    // Create a new set list
    function createSetList () {

      var modalInstance = $uibModal.open({
        templateUrl: 'components/set-list-modal/set-list-modal.html', 
        controller: 'SetListModal as vm', 
        resolve: {
          setList: function () {
            return {};
          }
        }
      });

      modalInstance.result.then(reallyCreateSetList, cancel);

      function cancel (reason) {
        //console.log(reason);
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
      newSetList.data.songListID = UserService.user().songListID;
      newSetList.data.songs = [];

      // Save set list to local storage
      SetListService.saveSetList(newSetList, true);

      // Open the set list page
      $state.transitionTo('set-list', {'setListID': newSetList.data._id });
    }

  }

})();
