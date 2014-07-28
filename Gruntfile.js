module.exports = function(grunt) {
  'use strict';

  var config = require('./config')(grunt);

  config.pkg = grunt.file.readJSON('./package.json');
  config.paths = { root: __dirname };

  grunt.initConfig(config);

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-available-tasks');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', [ 'availabletasks' ]);
  grunt.registerTask('compile', [
    'shell:install',
    'build',
    'uglify:build',
    'cssmin:build',
    'nodewebkit'
  ]);
  grunt.registerTask('build',   [
    'clean',
    'copy:app',
    'copy:fonts',
    'concat:js',
    'concat:css',
    'browserify:client',
    'less:dev'
  ]);

  grunt.registerTask('run-dev', [ 'connect:server:keepalive' ]);
  grunt.registerTask('run', [ 'shell:run' ]);
};
