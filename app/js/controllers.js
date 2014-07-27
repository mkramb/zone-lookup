'use strict';

angular.module('app.controllers', [])
  .controller('ZoneCtrl', ['$scope', function($scope) {
    var moment = require('moment-timezone');
    var zones = moment.tz.names();

    zones.sort();

    $scope.zones = zones;
    $scope.timeFrom = moment().format('HH:mm');

    $scope.$watch('[zoneFrom, zoneTo, timeFrom]', function() {
      var update = (
        $scope.zoneFrom &&
        $scope.zoneTo &&
        $scope.timeFrom
      );

      if (update) {
        var values = $scope.timeFrom.split(':');
        var timeFrom = moment().tz($scope.zoneFrom)
          .set('hour', values[0])
          .set('minute', values[1]);

        $scope.timeTo = timeFrom.tz($scope.zoneTo)
          .format('HH:mm a');

        return;
      }

      $scope.timeTo = null;
    }, true);
  }]);
