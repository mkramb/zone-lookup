'use strict';

require('./controllers');
require('./services');

angular.module('app', [
  'app.controllers',
  'app.services'
]);
