module.exports = function(grunt) {

  function testOS(name) {
    return new RegExp('^' + name).test(process.platform);
  }

  const NW_VERSION = '0.9.2';
  const NW_RUNTIME = 'cd cache/mac/' + NW_VERSION + ' && open -n -a node-webkit ../../../build';
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
      src: [
        './build/*'
      ]
    },
    clean: [
      './releases/**/*',
      './build/**',
      './build/*'
    ],
    copy: {
      lib: {
        expand: true,
        flatten: true,
        src: [
          './src/index.html',
          './src/package.json'
        ],
        dest: './build/'
      }
    },
    less: {
      dev: {
        options: {
          paths: [ './src/css']
        },
        files: {
          './build/assets/app.css': './src/css/app.less'
        }
      }
    },
    browserify: {
      lib: {
        src: [ './src/lib/angular/angular.js' ],
        dest: './build/assets/lib.js'
      },
      client: {
        src: './src/js/app.js',
        dest: './build/assets/app.js'
      }
    },
    shell: {
      install: {
        options: SHELL_OPTIONS,
        command: function() {
          return [
            'cd src',
            'bower cache clean',
            'bower install',
            'npm install'
          ].join(' && ');
        }
      },
      run: {
        options: SHELL_OPTIONS,
        command: function() {
          return NW_RUNTIME;
        }
      }
    },
    watch: {
      scripts: {
        files: [
          './src/**/*',
          './src/**'
        ],
        tasks: [ 'build' ],
        options: {
          spawn: false
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', [ 'run' ]);
  grunt.registerTask('install', [
    'shell:install',
    'build',
    'nodewebkit'
  ]);
  grunt.registerTask('build',   [
    'copy:lib',
    'browserify:lib',
    'browserify:client',
    'less:dev'
  ]);
  grunt.registerTask('run', [
    'build',
    'shell:run'
  ]);

};
