'use strict';

function ZoneInput ($compile) {
  var inputAttrs = {
    'from' : 'type="time"',
    'to'   : 'type="text" tabindex="-1" readonly="readonly"'
  };

  function capitaliseString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function getTemplate(type) {
    var capitalType = capitaliseString(type);

    return '<input data-ng-model="time' + capitalType + '" ' + inputAttrs[type] + '>' +
      '<select data-ng-model="zone' + capitalType + '" data-ng-options="zone for zone in zones"></select>';
  }

  return {
    restrict : 'E',
    replace: true,
    link: function(scope, element, attrs) {
      element.html(getTemplate(attrs.type));
      $compile(element.contents())(scope);
    }
  };
}

angular.module('app.directives', [])
  .directive('appZoneInput', ['$compile', ZoneInput]);
