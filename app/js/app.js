'use strict';

require('./controllers');
require('./directives');
require('./services');

angular.module('app', [
  'app.controllers',
  'app.directives',
  'app.services'
]);
