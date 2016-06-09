(function() {
  'use strict';

/**
 * @ngdoc function
 * @name SetListApp.controller:Index
 * @description
 * # Index
 * Controller of the SetListApp
 */

  angular
    .module('SetListApp')
    .controller('Index', Index);

  Index.$inject = [
    '$state', 
    'Rollbar', 
    'uiTourService', 
    'UserService',
    'VERSION'
  ];

  function Index($state, Rollbar, uiTourService, UserService, VERSION) {
    var vm = this;
    vm.finishTour = finishTour;
    vm.logout = logout;
    vm.startTour = startTour;
    vm.version = VERSION;

    function logout () {
      UserService.logout(function() { return; });
    }

    function startTour() {
      //Rollbar.info('User manually started the tour');
      var tour = uiTourService.getTour();
      if (tour) {
        tour.start();
        /*
        var step = tour.getCurrentStep();
        if (!step) {
          tour.start();
        } else {
          var state = $state.current.name;
          if (state === 'set-lists') {
            if (step.order <= 4) {
              tour.resume();
            } else {
              tour.start();
            }
          } else if (state === 'set-list') {
            if (step.order >= 5) {
              tour.resume();
            } else {
              tour.start();
            }
          } else {
            tour.start();
          } 
        }
        */
      }
    }

    function finishTour() {
      // Update the user to not display the tour again
      UserService.finishTour();
    }
    
  }

})();
