// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-08-04 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'bower_components/ngDraggable/ngDraggable.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/moment/moment.js',
      'bower_components/angular-momentjs/angular-momentjs.js',
      'bower_components/ngFacebook/dev/src/unmin/ngFacebook.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/ng-rollbar/ng-rollbar.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/jasmine/lib/jasmine-core/jasmine.js',
      'bower_components/jasmine-jquery/lib/jasmine-jquery.js',
      // endbower
      'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.js', 
      'bower_components/angular-bootstrap-datetimepicker/src/js/datetimepicker.templates.js', 
      'app/set-list-app.module.js', 
      'app/components/config/config.js', 
      'app/components/**/*.controller.js', 
      'app/components/filters/*.filter.js', 
      'app/services/**/*.resource.js', 
      'app/services/**/*.service.js', 
      'app/services/**/*.service.mock.js', 
      'app/components/**/*.controller.spec.js',
      'app/services/**/*.service.spec.js', 

      // fixtures
      {
        pattern: 'app/services/**/*.mock.json',
        watched: true, 
        served: true, 
        included: false
      }

    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      "PhantomJS"
      //"Chrome"
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      //"karma-chrome-launcher", 
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
