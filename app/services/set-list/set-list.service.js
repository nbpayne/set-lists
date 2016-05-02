(function() {
  'use strict';

  angular
  .module('SetListApp')
  .service('SetListService', SetListService);

  SetListService.$inject = [
    '$rootScope', 
    'SetListResource'
  ];

  function SetListService (
    $rootScope, 
    SetListResource
  ) {
    return {
      getSetLists: getSetLists, 
      saveSetLists: saveSetLists, 
      getSetList: getSetList, 
      saveSetList: saveSetList, 
      saveSetListToServer: saveSetListToServer, 
      deleteSetList: deleteSetList, 
      deleteSetListFromServer: deleteSetListFromServer
    };

    function getSetLists (callback) {
      SetListResource.query({ }, function(data) {
        var setLists = {};
        setLists.data = data;
        callback(setLists);
        saveSetLists(setLists, false);
      }, function (response) {
        // If 401 then logout
        if (response.status === 401) {
          $rootScope.$broadcast('authorize', { 'authorized': false });
        } else {
          // If failure get from local storage
          var setLists = angular.fromJson(localStorage['setLists']);
          if (setLists === undefined) { 
            setLists = {};
            setLists.data = [];
          }
          callback(setLists);
        }
      });
    }

    function saveSetLists (setLists) {
      // Save to local storage
      localStorage['setLists'] = angular.toJson(setLists);
      // TODO: How do I clean up localStorage?
    }

    function getSetList (setListID, callback) {
      SetListResource.get({ setListID: setListID }, function(data) {
        var setList = {};
        setList.data = data;
        callback(setList);
        saveSetList(setList, false);
      }, function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('authorize', { 'authorized': false });
        } else {
          // If failure get from local storage
          var setList = angular.fromJson(localStorage['setList_' + setListID]);
          if (setList === undefined) { 
            setList = {};
            setList.data = [];
          }
          callback(setList);
        }
      });
    }

    function saveSetList (setList, dirty) {
      // Save to local storage
      if (dirty === undefined) { dirty = true; }
      setList.isDirty = dirty;
      localStorage['setList_' + setList.data._id] = angular.toJson(setList);
    }

    function saveSetListToServer (setList) {
      // Save to server
      console.log('Save set list to server!');
      SetListResource.update({ setListID: setList.data._id }, setList.data, function (data) {
        saveSetList(setList, false);
        console.log(data);
      }, function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('authorize', { 'authorized': false });
        } else {
          console.log(response);
        }
      });
    }

    function deleteSetList (setListID) {
      // Save to laundry list in local storage
      //console.log('Save set list to dirty laundry list in local storage');
      var dirtyLaundry = angular.fromJson(localStorage['dirtyLaundry']);
      if (dirtyLaundry === undefined) { dirtyLaundry = []; }
      dirtyLaundry.push(setListID);
      localStorage['dirtyLaundry'] = angular.toJson(dirtyLaundry);
    }

    function deleteSetListFromServer (setListID) {
      console.log('Delete set list from server');
      SetListResource.delete({ setListID: setListID }, function(data) {
        // Remove set list from laundry list - here or in synchroniser?
        var dirtyLaundry = angular.fromJson(localStorage['dirtyLaundry']);
        dirtyLaundry.splice(dirtyLaundry.indexOf(setListID), 1);
        localStorage['dirtyLaundry'] = angular.toJson(dirtyLaundry);
        console.log(data);
      }, function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast('authorize', { 'authorized': false });
        } else {
          console.log(response);
        }
      });
    }

  }

})();
