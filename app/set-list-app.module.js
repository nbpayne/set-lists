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
    'facebook', 
    'my.config', 
    'ngDraggable',
    'ngResource', 
    'ui.bootstrap', 
    'ui.bootstrap.datetimepicker',
    'ui.router',
  ])
  .config(config)
  .run(run);

  function config ($stateProvider, $urlRouterProvider, $facebookProvider, FB_APPID) {
    // Routing
    $stateProvider
    .state('login', {
      url: '/login', 
      templateUrl: 'components/login/login.html', 
      controller: 'Login', 
      secure: false
    })
    .state('set-lists', {
      url: '/set-lists', 
      templateUrl: 'components/set-lists/set-lists.html',
      controller: 'SetLists', 
      controllerAs: 'vm',
      secure: true
    })
    .state('set-list', {
      url: '/set-lists/:setListID', 
      templateUrl: 'components/set-list/set-list.html',
      controller: 'SetList', 
      controllerAs: 'vm',
      secure: true
    });

    $urlRouterProvider.otherwise('/set-lists');

    $facebookProvider.init({
        appId: FB_APPID,
        status: true,
        cookies: false,
        xfbml: false, 
        version: 'v2.5'
    });

  }

  function run ($rootScope, UserService, $state, $facebook) {
    // Enforce security
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      if(toState.secure && !UserService.isLoggedIn) {
        $state.transitionTo('login');
        event.preventDefault();
      }
    });

    // Init authentication
    $rootScope.$on('facebook.auth.authResponseChange', function(event, response) {
      if (response.status === 'connected') {
        console.log(response);
        UserService.login(response.authResponse, function() {
          $rootScope.$broadcast('authenticate', { 'authenticated': true });
        });
      } else {
        console.log(response.status);
        UserService.logout(function () {
          $rootScope.$broadcast('authenticate', { 'authenticated': false });
        });
      }
    });
  }

})();
