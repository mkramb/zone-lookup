'use strict';

require('./controllers');
require('./services');

angular.module('app', [
  'ui.bootstrap',
  'app.services',
  'app.controllers'
]);
