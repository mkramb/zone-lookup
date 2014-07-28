module.exports = {
  dev: {
    options: {
      paths: [ '<%= paths.root %>/app/css' ]
    },
    files: {
      '<%= paths.root %>/build/static/app.css': '<%= paths.root %>/app/css/app.less'
    }
  }
};
