module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: ['script/**/*.js'],
        dest: 'www/js/<%= pkg.name %>.js'
      }
    },
    jshint: {
      beforeconcat: ['script/**/*.js'],
      afterconcat: ['<%= concat.dist.dest %>']
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
    watch: {
      scripts: {
        files: ['script/**/*.js'],
        tasks: ['test','build'],
        options: {
          spawn: false,
        },
      },
    }
  });

  // Load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('test', ['jshint', 'mocha']);
  grunt.registerTask('build', ['concat']);
  grunt.registerTask('default', ['test', 'build', 'watch']);
};