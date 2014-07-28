module.exports = {
  scripts: {
    files: [
      '<%= paths.root %>/app/**/*',
      '<%= paths.root %>/app/**'
    ],
    tasks: [ 'build' ],
    options: {
      livereload: true,
      spawn: false
    }
  }
};
