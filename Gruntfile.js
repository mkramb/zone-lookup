module.exports = function(grunt) {

  function testOS(name) {
    return new RegExp('^' + name).test(process.platform);
  }

  const NW_VERSION = '0.9.2';
  const NW_RUNTIME = 'cd cache/mac/' + NW_VERSION + ' && open -n -a node-webkit ../../../src';
  const NW_OPTIONS = {
    version: NW_VERSION,
    build_dir: './',
    mac: testOS('darwin'),
    win: testOS('win'),
    linux32: testOS('linux'),
    linux64: testOS('linux64'),
    keep_nw: false,
    zip: false
  };

  const SHELL_OPTIONS = {
    stdout: true,
    stderr: true,
    stdin: true
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    nodewebkit: {
      options: NW_OPTIONS,
      src: [ './src/**/*' ]
    },
    clean: [ './releases/**/*' ],
    shell: {
      install: {
        options: SHELL_OPTIONS,
        command: function() {
          return 'cd src && npm install';
        }
      },
      run: {
        options: SHELL_OPTIONS,
        command: function() {
          return NW_RUNTIME;
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', [ 'default' ]);
  grunt.registerTask('install', [ 'shell:install', 'nodewebkit' ]);
  grunt.registerTask('build',   [ 'nodewebkit' ]);
  grunt.registerTask('run',     [ 'shell:run' ]);

};
