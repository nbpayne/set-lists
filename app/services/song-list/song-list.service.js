(function() {
  'use strict';

  angular
  .module('SetListApp')
  .service('SongListService', SongListService);

  SongListService.$inject = [
    '$rootScope', 
    'Rollbar', 
    'SongListResource'
  ];

  function SongListService (
    $rootScope, 
    Rollbar, 
    SongListResource
  ) {
    return {
      getSongList: getSongList, 
      saveSongList: saveSongList, 
      saveSongListToServer: saveSongListToServer
    };

    function getSongList (songListID, callback) {
      console.log('Get song list from the server');
      SongListResource.get({ songListID: songListID }, function(data) {
        var songList = {};
        songList.data = data;
        callback(songList);
        saveSongList(songList, false);
      }, function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('authorize', { 'authorized': false });
        } else {
          // If failure get from local storage
          var songList = angular.fromJson(localStorage['songList_' + songListID]);
          if (songList === undefined) { 
            songList = {};
            songList.data = [];
          }
          callback(songList);
          Rollbar.warning('getSongList failed to get the song list -- song list gotten from localStorage');
        }
      });
    }

    function saveSongList (songList, dirty) {
      // Save to local storage
      console.log('Save song list to local storage');
      if (dirty === undefined) { dirty = true; }
      songList.isDirty = dirty;
      localStorage['songList_' + songList.data._id] = angular.toJson(songList);
    }

    function saveSongListToServer (songList) {
      // Save to server
      console.log('Save song list to server!');
      SongListResource.update({ songListID: songList.data._id }, songList.data, function (data) {
        saveSongList(songList, false);
      }, function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('authorize', { 'authorized': false });
        } else {
          Rollbar.warning('saveSongListToServer failed to save the song list to the server', response);
        }
      });
    }

  }

})();