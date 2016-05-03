(function() {
  'use strict';

  angular
  .module('SetListApp')
  .service('SynchronisationService', SynchronisationService);

  SynchronisationService.$inject = [
    '$interval', 
    'SongListService', 
    'SetListService', 
    '$stateParams'
  ];

  function SynchronisationService ($interval, SongListService, SetListService, $stateParams) {
    var synchroniser;

    return { 
      startSetListSynchroniser: startSetListSynchroniser,
      stopSetListSynchroniser: stopSetListSynchroniser, 
      startSetListsSynchroniser: startSetListsSynchroniser, 
      stopSetListsSynchroniser: stopSetListsSynchroniser
    };

    function startSetListSynchroniser () {
      console.log('Set list synchroniser started');
      synchroniser = $interval(function () {
        // Only run if we have a setListID
        if ($stateParams.setListID) {
          // Check dirtiness of song list
          var songList = angular.fromJson(
            localStorage[
              'songList_' + 
              angular.fromJson(localStorage['setList_' + $stateParams.setListID]).data.songListID
            ]
          );
          if (songList !== undefined && songList.isDirty) {
            SongListService.saveSongListToServer(songList);
          }

          // Check dirtiness of set list
          // TODO: Get set list from local storage by ID
          var setList = angular.fromJson(localStorage['setList_' + $stateParams.setListID]);
          if (setList !== undefined && setList.isDirty) {
            SetListService.saveSetListToServer(setList);
          } 
        }
      }, 2000);
    }

    function stopSetListSynchroniser () {
      console.log('Set list synchroniser stopped');
      $interval.cancel(synchroniser);
    }

    function startSetListsSynchroniser () {
      console.log('Set lists synchroniser started');
      synchroniser = $interval(function () {
        // Get dirty laundry from local storage
        var dirtyLaundry = angular.fromJson(localStorage['dirtyLaundry']);
        if (dirtyLaundry !== undefined) {
          for (var i = 0; i < dirtyLaundry.length; i++) {
            SetListService.deleteSetListFromServer(dirtyLaundry[i]);
          }
        }
      }, 2000); 
    }

    function stopSetListsSynchroniser () {
      console.log('Set lists synchroniser stopped');
      $interval.cancel(synchroniser);
    }
  }

})();
