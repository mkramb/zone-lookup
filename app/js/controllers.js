'use strict';

function ZoneCtrl ($scope, ZoneService) {
  $scope.zones = ZoneService.zones;
  $scope.timeFrom = ZoneService.current;

  $scope.$watch('[zoneFrom, zoneTo, timeFrom]', function() {
    var update = (
      $scope.zoneFrom &&
      $scope.zoneTo &&
      $scope.timeFrom
    );

    if (update) {
      $scope.timeTo = ZoneService.convert(
        $scope.timeFrom,
        $scope.zoneFrom,
        $scope.zoneTo
      );

      return;
    }

    $scope.timeTo = null;
  }, true);
}

angular.module('app.controllers', [])
  .controller('ZoneCtrl', ['$scope', 'ZoneService', ZoneCtrl]);
