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
      'tandibar/ng-rollbar', 
      'ui.bootstrap', 
      'ui.bootstrap.datetimepicker',
      'ui.router'
    ])
    .constant('VERSION', '0.19.2')
    .config(config)
    .run(run);

  function config (
    $facebookProvider,
    $stateProvider, 
    $urlRouterProvider, 
    ENV, 
    FB_APPID, 
    ROLLBAR_ID, 
    RollbarProvider
  ) {
    // Configure Rollbar for error logging
    RollbarProvider.init({
      accessToken: ROLLBAR_ID,
      verbose: (ENV === 'development'), 
      captureUncaught: true,
      payload: {
        environment: ENV
      }
    });

    // Routing
    $stateProvider
    .state('login', {
      url: '/login', 
      templateUrl: 'components/login/login.html', 
      controller: 'Login', 
      controllerAs: 'vm', 
      secure: false
    })
    .state('authorize', {
      url: '/authorize', 
      templateUrl: 'components/authorize/authorize.html', 
      controller: 'Authorize', 
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
        version: 'v2.6'
    });

  }

  function run (
    $facebook,
    $rootScope,  
    $state,  
    $window, 
    Rollbar, 
    UserService
  ) {
    // Get user
    var user = UserService.user();
    // Add user information to Rollbar logging
    if (user) {
      Rollbar.configure({
        payload: {
          person: {
            id: user.id
          }
        }
      });
    }
    
    // Enforce security
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      // Get rid of any querystring (esp. after redirect from facebook login)
      if ($window.location.search) {
        if ($window.location.search.includes('?code=')) {
          $window.location.href = $window.location.origin + $window.location.pathname + '#/authorize';
        } else {
          $window.location.href = $window.location.origin + $window.location.pathname + '#/set-lists'; 
        }
      } else {
        // Secure pages
        if(toState.secure && !user.isLoggedIn) {
          $state.transitionTo('login');
          event.preventDefault();
        }
      }
    });

    // Handle authentication state changes
    $rootScope.$on('authenticate', function (event, response) {
      if(!response.authenticated) {
        $state.transitionTo('login');
      } else {
        // Update user object
        user = UserService.user();

        // Add user information to Rollbar logging
        Rollbar.configure({
          payload: {
            person: {
              id: user.id
            }
          }
        });
        $state.transitionTo('set-lists');
      }
    });

    // Listen for authorization
    $rootScope.$on('authorize', function (event, response) {
      UserService.logout();
    });

  }

})();
