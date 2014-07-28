module.exports = function(grunt) {
  'use strict';

  var config = require('./config')(grunt);

  config.pkg = grunt.file.readJSON('./package.json');
  config.paths = { root: __dirname };

  grunt.initConfig(config);

  Object.keys(config.pkg.devDependencies).forEach(function(item) {
    if (item.lastIndexOf('grunt-', 0) === 0) {
      grunt.loadNpmTasks(item);
    }
  });

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
