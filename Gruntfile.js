// Generated on 2015-08-04 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Serve static files
  var serveStatic = require('serve-static');


  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      javascript: {
        files: [
          'app/set-list-app.module.js', 
          'app/components/**/*.controller.js', 
          'app/components/**/*.filter.js', 
          'app/services/**/*.mock.js', 
          'app/services/**/*.resource.js', 
          'app/services/**/*.service.js'
        ],
        tasks: ['newer:jshint:all', 'karma'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      tests: {
        files: [
          'app/components/**/*.controller.spec.js', 
          'app/services/**/*.service.spec.js'
        ],
        tasks: ['newer:jshint:test', 'karma']
      }, 
      sass: {
        files: ['app/styles/{,*/}*.{scss,sass}'],
        tasks: ['sass:server', 'autoprefixer']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      karmaConf: {
        files: ['test/karma.conf.js'], 
        tasks: ['karma']
      }, 
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          'app/index.html', 
          'app/{,*/}{,*/}*.html',
          '.tmp/styles/{,*/}*.css',
          'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        livereload: 35729, 
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              serveStatic('.tmp'),
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              connect().use(
                '/app/styles',
                serveStatic('./app/styles')
              ),
              connect().use(
                '/fonts',
                serveStatic('./bower_components/font-awesome/fonts')
              ),
              serveStatic('app')
            ];
          }
        }
      },
      subfolder: {
        options: {
          open: false,
          middleware: function (connect) {
            return [
              connect().use(
                '/app/bower_components',
                serveStatic('./bower_components')
              ),
              connect().use(
                '/app/styles',
                serveStatic('./.tmp/styles')
              ),
              connect().use(
                '/app/fonts',
                serveStatic('./bower_components/font-awesome/fonts')
              ),
              serveStatic('./')
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              serveStatic('.tmp'),
              serveStatic('test'),
              connect().use(
                '/bower_components',
                serveStatic('./bower_components')
              ),
              serveStatic('app')
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: 'dist'
        }
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          'app/set-list-app.module.js', 
          'app/components/**/*.controller.js', 
          'app/components/**/*.filter.js', 
          'app/services/**/*.mock.js', 
          'app/services/**/*.resource.js', 
          'app/services/**/*.service.js'
        ]
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        src: ['test/spec/{,*/}*.js']
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            'dist/{,*/}*',
            '!dist/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      server: {
        options: {
          map: true,
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,*/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['app/index.html'],
        exclude: [
          'bower_components/angular/angular.js', 
          'bower_components/bootstrap-social/bootstrap-social.css', 
          'bower_components/bootstrap/dist/js/bootstrap.js'
        ], 
        ignorePath:  /\.\.\//
      },
      test: {
        devDependencies: true,
        src: '<%= karma.unit.configFile %>',
        ignorePath:  /\.\.\//,
        fileTypes:{
          js: {
            block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
              detect: {
                js: /'(.*\.js)'/gi
              },
              replace: {
                js: '\'{{filePath}}\','
              }
            }
          }
      },
      sass: {
        src: ['app/styles/{,*/}*.{scss,sass}'],
        ignorePath: /(\.\.\/){1,2}bower_components\//
      }
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourcemap: true, 
        includePaths: ['./bower_components']
      }, 
      server: {
        files: {
          '.tmp/styles/main.css': 'app/styles/main.scss'
        }  
      }
    }, 

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          'dist/scripts/{,*/}*.js',
          'dist/styles/{,*/}*.css',
          'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          'dist/styles/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: 'app/index.html',
      options: {
        dest: 'dist',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['dist/{,*/}*.html'],
      css: ['dist/styles/{,*/}*.css'],
      options: {
        assetsDirs: [
          'dist',
          'dist/images',
          'dist/styles'
        ]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.html', 'components/{,*/}*.html'],
          dest: 'dist'
        }]
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Replace Google CDN references
    cdnify: {
      dist: {
        html: ['dist/*.html']
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: 'app',
          dest: 'dist',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            'components/{,*/}*.html',
            'images/{,*/}*.{webp}',
            'styles/fonts/{,*/}*.*', 
            '.nojekyll'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: 'dist/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: '.',
          src: 'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*',
          dest: 'dist'
        }, {
          expand: true, 
          cwd: 'bower_components/font-awesome', 
          src: 'fonts/*', 
          dest: 'dist'
        }, {
          expand: true,
          src: 'app/components/config/config.PRD.js', 
          rename: function () { 
            return 'dist/components/config/config.js'; 
          }
        }]
      },
      styles: {
        expand: true,
        cwd: 'app/styles',
        dest: '.tmp/styles/',
        src: '{,*/}*.css'
      }
    },

    // Test settings
    karma: {
      unit: {
        configFile: 'test/karma.conf.js',
        singleRun: true
      }
    }
  });


  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run(['clean:server', 'wiredep', 'sass', 'autoprefixer:server', 'connect:livereload', 'watch' ]);
  });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run(['serve:' + target]);
  });

  grunt.registerTask('test', ['clean:server', 'wiredep', 'sass', 'autoprefixer', 'connect:test', 'karma']);

  grunt.registerTask('build', ['clean:dist', 'wiredep', 'useminPrepare', 'sass', 'autoprefixer', 'concat',
    'ngAnnotate', 'copy:dist', 'cdnify', 'cssmin', 'uglify', 'filerev', 'usemin', 'htmlmin']);

  grunt.registerTask('default', ['newer:jshint', 'test', 'build']);
};
