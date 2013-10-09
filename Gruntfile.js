module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      app: {
        src: ['script/**/*.js'],
        dest: 'www/js/<%= pkg.name %>.js'
      },
      components: {
        src: [
          'bower_components/angular-phonegap/src/PhoneGap.js',
          'bower_components/angular-phonegap/src/plugins/Notification.js',
          'bower_components/angular-phonegap/src/plugins/Splashscreen.js'
        ],
        dest: 'www/js/components.js'
      },
      vendor: {
        src: [
          'bower_components/angular/angular.js',
          'bower_components/angular-touch/angular-touch.js',
          'bower_components/angular-animate/angular-animate.js'
        ],
        dest: 'www/js/vendor.js'
      }
    },

    jshint: {
      beforeconcat: ['script/**/*.js'],
      afterconcat: ['<%= concat.app.dest %>']
    },

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

    watch: {
      less: {
        files: ['less/**/*.less'],
        tasks: ['less'],
        options: {
          spawn: false,
        },
      },
      scripts: {
        files: ['script/**/*.js'],
        tasks: ['test', 'concat:app'],
        options: {
          spawn: false,
        },
      },
      test: {
        files: ['test/*.html', 'test/spec/**/*.js'],
        tasks: ['test'],
        options: {
          spawn: false,
        },
      }
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('build', ['less', 'concat']);
  grunt.registerTask('default', ['test', 'build', 'watch']);
};