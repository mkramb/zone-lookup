module.exports = {
  options: {
    except: ['jQuery', 'bootstrap', 'angular']
  },
  build: {
    files: {
      '<%= paths.root %>/build/static/app.js': [ '<%= paths.root %>/build/static/app.js' ],
      '<%= paths.root %>/build/static/lib.js': [ '<%= paths.root %>/build/static/lib.js' ]
    }
  }
};
