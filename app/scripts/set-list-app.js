(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name SetListApp
   * @description
   * # SetListApp
   *
   * Main module of the application.
   */
   
  angular
  .module('SetListApp', [
    'angular-momentjs',
    'my.config', 
    'ngDraggable',
    'ngResource', 
    'ui.bootstrap', 
    'ui.bootstrap.datetimepicker',
    'ui.router',
  ])
  .config(config);

  function config ($stateProvider, $urlRouterProvider) {
    // Routing
    $stateProvider
    .state('set-lists', {
      url: '/set-lists', 
      templateUrl: 'scripts/set-lists/set-lists.html',
      controller: 'SetLists', 
      controllerAs: 'vm',
      secure: false
    })
    .state('set-list', {
      url: '/set-lists/:setListID', 
      templateUrl: 'scripts/set-list/set-list.html',
      controller: 'SetList', 
      controllerAs: 'vm',
      secure: false
    });

    $urlRouterProvider.otherwise('/set-lists');

  }

})();
