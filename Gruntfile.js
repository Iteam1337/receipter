module.exports = function(grunt) {

  var fs = require('fs');

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // This concatenates all js files into three different dists
    // [pkg.name].js - contains all app specific code
    // vendor.js - contains all libs like angular
    concat: {
      app: {
        src: ['script/**/*.js'],
        dest: 'www/js/<%= pkg.name %>.js'
      },
      vendor: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-route/angular-route.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-animate/angular-animate.js',
          'bower_components/momentjs/moment.js'
        ],
        dest: 'www/js/vendor.js'
      }
    },

    // hints all js files before and after concatenation
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true,
        smarttabs: true,
        unused: true,  
        maxcomplexity: 4,
        globalstrict: true,
        newcap: false,
        laxcomma: true,
        sub: true,
        globals: {
          $: true,
          angular: true,
          console: true
        },
      },
      beforeconcat: ['script/**/*.js'],
      afterconcat: ['<%= concat.app.dest %>']
    },

    // runs all tests in a phantom.js headless browser
    mocha: {
      client: {
        // Test files
        src: [ 'test/*.html' ],
        options: {
          // Pipe output console.log from your JS to grunt. False by default.
          log: true,

          // mocha options
          mocha: {
            ignoreLeaks: false
          },

          // Select a Mocha reporter
          // http://visionmedia.github.com/mocha/#reporters
          reporter: 'Nyan',

          // Indicates whether 'mocha.run()' should be executed in
          // 'bridge.js'. If you include `mocha.run()` in your html spec,
          // check if environment is PhantomJS. See example/test/test2.html
          run: true
        }
      }
    },

    // builds the less
    less: {
      development: {
        options: {
          paths: ["less"]
        },
        files: {
          "www/css/<%= pkg.name %>.css": "less/main.less"
        }
      }
    },

    // runs shell commands
    shell: {
      _options: {
        failOnError: true,
        stdout: true
      },
      build: {
        command: 'cordova build'
      }
    },

    // copy all files into build for faster update
    copy: {
      ios: {
        files: [
          { expand: true, src: ['www/**'], dest: 'platforms/ios/' }, // includes files in path and its subdirs
          { expand: true, cwd: 'Resources/icon/ios/', src: [ '*' ], dest: 'platforms/ios/Receipter/Resources/icons/', flatten: true, filter: 'isFile' },
          { expand: true, cwd: 'Resources/screen/ios/', src: [ '*' ], dest: 'platforms/ios/Receipter/Resources/splash/', flatten: true, filter: 'isFile' }
        ]
      }
    },

    // Server with live reload
    connect: {
      ios: {
        options: {
          port: 5000,
          base: 'platforms/ios/www',
          hostname: '*',
          livereload: true,
          open: true
        }
      }
    },

    // watches changes to the file system to rerun tasks
    watch: {
      www: {
        files: ['www/**/*.*', 'Resources/**/*'],
        tasks: ['copy'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      less: {
        files: ['less/**/*.less'],
        tasks: ['less', 'copy'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      scripts: {
        files: ['script/**/*.js'],
        tasks: ['test', 'concat:app', 'copy'],
        options: {
          spawn: false,
          livereload: true
        }
      },
      test: {
        files: ['test/*.html', 'test/spec/**/*.js'],
        tasks: ['test']
      },
      plugins: {
        files: ['plugins/**/*', 'www/config.xml'],
        tasks: ['shell:build', 'copy']
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('build', ['less', 'concat', 'shell:build', 'copy']);
  grunt.registerTask('default', ['test', 'build', 'connect', 'watch']);
};