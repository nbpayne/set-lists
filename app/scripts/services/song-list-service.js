(function() {
  'use strict';

  angular
  .module('SetListApp')
  .service('SongListService', SongListService);

  SongListService.$inject = [
    'SongListResource'
  ];

  function SongListService (SongListResource) {
    return {
      getSongList: getSongList, 
      saveSongList: saveSongList, 
      saveSongListToServer: saveSongListToServer
    };

    function getSongList (songListID, callback) {
      SongListResource.get({ songListID: songListID }, function(data) {
        var songList = {};
        songList.data = data;
        callback(songList);
        saveSongList(songList, false);
      }, function (response) {
        // If failure get from local storage
        var songList = angular.fromJson(localStorage['songList_' + songListID]);
        if (songList === undefined) { 
          songList = {};
          songList.data = [];
        }
        callback(songList);
      });
    }

    function saveSongList (songList, dirty) {
      // Save to local storage
      if (dirty === undefined) { dirty = true; }
      songList.isDirty = dirty;
      localStorage['songList_' + songList.data._id] = angular.toJson(songList);
    }

    function saveSongListToServer (songList) {
      // Save to server
      console.log('Save song list to server!');
      SongListResource.update({ songListID: songList.data._id }, songList.data, function (data) {
        saveSongList(songList, false);
        console.log(data);
      }, function (data) {
        console.log(data);
      });
    }

  }

})();