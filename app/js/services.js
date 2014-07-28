'use strict';

function ZoneService () {
  var moment = require('moment-timezone');

  this.current = moment();
  this.zones = moment.tz.names();
  this.zones.sort();

  this.convert = function(timeFrom, zoneFrom, zoneTo) {
    var values = timeFrom.split(':');
    var timeFrom = moment().tz(zoneFrom)
      .set('hour', values[0])
      .set('minute', values[1]);

    return timeFrom.tz(zoneTo);
  };
}

angular.module('app.services', [])
  .service('ZoneService', ZoneService);
