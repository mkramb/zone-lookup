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
    availabletasks: {
      tasks: {}
    },
    nodewebkit: {
      options: NW_OPTIONS,
      src: [
        './build/*'
      ]
    },
    uglify: {
      options: {
        except: ['jQuery', 'bootstrap', 'angular']
      },
      build: {
        files: {
          './build/static/app.js': [ './build/static/app.js' ],
          './build/static/lib.js': [ './build/static/lib.js' ]
        }
      }
    },
    cssmin: {
      build: {
        files: {
          './build/static/app.css': [ './build/static/app.css' ],
          './build/static/lib.css': [ './build/static/lib.css' ]
        }
      }
    },
    clean: [
      './releases/**/*',
      './build/**',
      './build/*'
    ],
    copy: {
      app: {
        expand: true,
        flatten: true,
        src: [
          './app/index.html',
          './app/package.json'
        ],
        dest: './build/'
      },
      fonts: {
        expand: true,
        flatten: true,
        src: [ './app/lib/bootstrap/dist/fonts/*' ],
        dest: './build/fonts'
      }
    },
    less: {
      dev: {
        options: {
          paths: [ './app/css' ]
        },
        files: {
          './build/static/app.css': './app/css/app.less'
        }
      }
    },
    concat: {
      js: {
        src: [
          './app/lib/jquery/dist/jquery.js',
          './app/lib/bootstrap/dist/js/bootstrap.js',
          './app/lib/angular/angular.js'
        ],
        dest: './build/static/lib.js'
      },
      css: {
        src: [
          './app/lib/bootstrap/dist/css/bootstrap.css',
          './app/lib/bootstrap/dist/css/bootstrap-theme.css'
        ],
        dest: './build/static/lib.css'
      }
    },
    browserify: {
      client: {
        src: './app/js/app.js',
        dest: './build/static/app.js'
      }
    },
    shell: {
      install: {
        options: SHELL_OPTIONS,
        command: function() {
          return [
            'cd app',
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
          './app/**/*',
          './app/**'
        ],
        tasks: [ 'build' ],
        options: {
          livereload: true,
          spawn: false
        }
      }
    },
    connect: {
      server: {
        options: {
          port: 9000,
          base: 'build',
          open: true
        }
      }
    }
  });

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
  grunt.registerTask('webkit', [
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
