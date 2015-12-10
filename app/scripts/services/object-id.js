(function () {

  'use strict';

  /**
   * @ngdoc service
   * @name SetListApp.ObjectIdService
   * @description
   * # ObjectIdService
   * Service in the SetListApp.
   */
  angular.module('SetListApp')
  .service('ObjectIdService', ObjectIdService);
  
  function ObjectIdService () {
    var increment = 0;
    var pid = Math.floor(Math.random() * (32767));
    var machine = Math.floor(Math.random() * (16777216));

    var service = {
      getObjectId: getObjectId
    };

    initialize();

    return service;
    
    function initialize () {
      if (typeof (localStorage) !== 'undefined') {
        var mongoMachineId = parseInt(localStorage['mongoMachineId']);
        if (mongoMachineId >= 0 && mongoMachineId <= 16777215) {
            machine = Math.floor(localStorage['mongoMachineId']);
        }
        // Just always stick the value in.
        localStorage['mongoMachineId'] = machine;
      }
    }

    function getObjectId () {
      var timestamp = Math.floor(new Date().valueOf() / 1000);
      increment++;
      if (increment > 0xffffff) {
        increment = 0;
      }

      var thisTimestamp = timestamp.toString(16);
      var thisMachine = machine.toString(16);
      var thisPid = pid.toString(16);
      var thisIncrement = increment.toString(16);
      return '00000000'.substr(0, 8 - thisTimestamp.length) + thisTimestamp +
             '000000'.substr(0, 6 - thisMachine.length) + thisMachine +
             '0000'.substr(0, 4 - thisPid.length) + thisPid +
             '000000'.substr(0, 6 - thisIncrement.length) + thisIncrement;
    }

  }

})();
