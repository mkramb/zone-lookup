'use strict';

require('./controllers');
require('./services');

angular.module('app', [
  'app.services',
  'app.controllers'
]);
