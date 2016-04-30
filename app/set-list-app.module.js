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
      'ngDraggable',
      'ngResource', 
      'SetListApp.config', 
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
      controllerAs: 'vm', 
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
      if(toState.secure && !UserService.user().isLoggedIn) {
        $state.transitionTo('login');
        event.preventDefault();
      }
    });

    $rootScope.$on('authenticate', function (event, response) {
      if(!response.authenticated) {
        $state.transitionTo('login');
      }
    })

    // Init authentication
    $rootScope.$on('facebook.auth.authResponseChange', function(event, response) {
      if (response.status === 'connected') {
        console.log(response);
        UserService.login(response.authResponse);
      } else {
        console.log(response.status);
        UserService.logout();
      }
    });
  }

})();
