const NW_VERSION = '0.9.2';
const NW_RUNTIME = 'cd <%= paths.root %>/cache/mac/' + NW_VERSION + ' && open -n -a node-webkit <%= paths.root %>/build';

const SHELL_OPTIONS = {
  stdout: true,
  stderr: true,
  stdin: true
};

module.exports = {
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
};
