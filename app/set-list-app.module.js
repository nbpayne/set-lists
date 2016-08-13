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
      'angulartics', 
      'angulartics.google.analytics', 
      'bm.uiTour', 
      'facebook', 
      'ngclipboard', 
      'ngDraggable',
      'ngResource', 
      'SetListApp.config', 
      'tandibar/ng-rollbar', 
      'ui.bootstrap', 
      'ui.bootstrap.datetimepicker',
      'ui.router'
    ])
    .constant('VERSION', '0.30')
    .constant('PATCH', '0')
    .config(config)
    .run(run);

  function config (
    $analyticsProvider, 
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

    // Disable GA during development
    if(ENV === 'development') {
      $analyticsProvider.developerMode(true);
    }
    
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
    .state('release-notes', {
      url: '/release-notes', 
      templateUrl: 'components/release-notes/release-notes.html', 
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
    })
    .state('share', {
      url: '/share/:shareID', 
      templateUrl: 'components/share/share.html', 
      controller: 'Share', 
      controllerAs: 'vm', 
      secure: false
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
    $analytics, 
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

    // And to GA
    $analytics.setUsername(user.id);
    
    // Enforce security
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
      // Get rid of any querystring (esp. after redirect from facebook login)
      if ($window.location.search) {
        if ($window.location.search.indexOf('?code=') !== -1) {
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

        // Add user to GA
        $analytics.setUsername(user.id);
        $state.transitionTo('set-lists');
      }
    });

    // Listen for authorization
    $rootScope.$on('authorize', function (event, response) {
      UserService.logout();
    });

  }

})();
