module.exports = {
  app: {
    expand: true,
    flatten: true,
    src: [
      '<%= paths.root %>/app/index.html',
      '<%= paths.root %>/app/package.json'
    ],
    dest: '<%= paths.root %>/build/'
  },
  fonts: {
    expand: true,
    flatten: true,
    src: [ '<%= paths.root %>/app/lib/bootstrap/dist/fonts/*' ],
    dest: '<%= paths.root %>/build/fonts'
  }
};
