module.exports = {
  js: {
    src: [
      '<%= paths.root %>/app/lib/jquery/dist/jquery.js',
      '<%= paths.root %>/app/lib/bootstrap/dist/js/bootstrap.js',
      '<%= paths.root %>/app/lib/angular/angular.js'
    ],
    dest: '<%= paths.root %>/build/static/lib.js'
  },
  css: {
    src: [
      '<%= paths.root %>/app/lib/bootstrap/dist/css/bootstrap.css',
      '<%= paths.root %>/app/lib/bootstrap/dist/css/bootstrap-theme.css'
    ],
    dest: '<%= paths.root %>/build/static/lib.css'
  }
};
