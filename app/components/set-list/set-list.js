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
      .controller('SetList', SetList);

  SetList.$inject = [
    '$location', 
    // '$log', 
    '$uibModal', 
    '$scope', 
    '$stateParams', 
    'filterFilter', 
    'ObjectIdService', 
    'orderByFilter', 
    'SetListService', 
    'SongListService', 
    'SynchronisationService'
  ];

  function SetList (
    $location, 
    // $log, 
    $uibModal, 
    $scope, 
    $stateParams, 
    filterFilter, 
    ObjectIdService, 
    orderByFilter, 
    SetListService, 
    SongListService, 
    SynchronisationService
  ) {
    var vm = this;
    vm.location = $location.absUrl();

    vm.addNewSong = addNewSong;
    vm.addSong = addSong;
    vm.editSetList = editSetList;
    vm.editSong = editSong;
    vm.moveSong = moveSong;
    vm.onDropComplete = onDropComplete;
    vm.removeSong = removeSong;
    vm.saveSong = saveSong;

    // Get set list from server
    SetListService.getSetList($stateParams.setListID, initialize);
    
    // Start synchroniser
    SynchronisationService.startSetListSynchroniser();

    // Initialize the data for the view
    function initialize (setList) {
      // Shutdown synchroniser
      $scope.$on('$destroy', function() {
        // Make sure that the interval is destroyed too
        SynchronisationService.stopSetListSynchroniser();
      });

      // Get the song lis
      SongListService.getSongList(setList.data.songListID, function(songList) {
        // Add songlist to the view model
        vm.songList = songList;

        // Create empty set list to bind to the UI
        vm.setList = {};
        vm.setList.data = {};

        // Copy temp set list to our scope set list
        vm.setList.data._id = setList.data._id;
        vm.setList.data.date = setList.data.date;
        vm.setList.data.venue = setList.data.venue;
        vm.setList.data.songListID = setList.data.songListID;
        vm.setList.data.songs = [];

        // Build set list  into scope from song list so that the songs are connected
        for (var i = 0; i < setList.data.songs.length; i++) {
          var matchedSongs = $.grep(vm.songList.data.songs, compareSongs);
          vm.setList.data.songs.push(matchedSongs[0]);
        }

        function compareSongs (e) { 
          return e._id === setList.data.songs[i]._id;
        }

      });

    }

    // Add a song from the search field -- create one if it doesn't exist
    function addNewSong () {
      var song = filterFilter(vm.songList.data.songs, vm.search)[0];
      if (song == null) { 
        song = { 
          _id: ObjectIdService.getObjectId(), 
          name: vm.search 
        };
        vm.songList.data.songs.push(song);
        SongListService.saveSongList(vm.songList);
      }
      vm.setList.data.songs.push(song);
      vm.search = undefined;
      SetListService.saveSetList(vm.setList);
    }

    // Add song to set list
    function addSong (i) {
      vm.setList.data.songs.push(vm.songList.data.songs[i]);
      SetListService.saveSetList(vm.setList);
    }

    // Open the modal to edit the set list details
    function editSetList () {
      var tmpSetList = {};
      tmpSetList.date = vm.setList.data.date;
      tmpSetList.venue = vm.setList.data.venue;

      var modalInstance = $uibModal.open({
        templateUrl: 'scripts/set-list-modal/set-list-modal.html', 
        controller: 'SetListModal as vm', 
        resolve: {
          setList: function () {
            return tmpSetList;
          }
        }
      });

      modalInstance.result.then(function (tmpSetList) {
        // Update UI and save set list to local storage
        vm.setList.data.date = tmpSetList.date;
        vm.setList.data.venue = tmpSetList.venue;
        SetListService.saveSetList(vm.setList);
      }, function (reason) {
        //$log.info(reason);
      });
    }

    // Edit a song
    function editSong (i) {
      var tmp = orderByFilter(vm.songList.data.songs, 'name')[i];
      var index = vm.songList.data.songs.indexOf(tmp);
      vm.songList.data.songs[index].edit = true;
    }

    // Move a song
    function moveSong (from, to) {
      // No change
      if (from === to) { 
        return;
      }

      // Move it!
      vm.setList.data.songs.splice(to, 0, vm.setList.data.songs.splice(from, 1)[0]);
      SetListService.saveSetList(vm.setList);
    }

    // Handle the drop event and pass to move a song
    function onDropComplete (i, d) {
      vm.moveSong(vm.setList.data.songs.indexOf(d), i);
    }

    // Remove song from set list
    function removeSong (index) {
      vm.setList.data.songs.splice(index, 1);
      SetListService.saveSetList(vm.setList);
    }

    // Save a song you've just edited
    function saveSong (i) {
      var tmp = orderByFilter(vm.songList.data.songs, 'name')[i];
      var index = vm.songList.data.songs.indexOf(tmp);
      vm.songList.data.songs[index].edit = false;
      SongListService.saveSongList(vm.songList);
      SetListService.saveSetList(vm.setList);
    }

  }

})();
