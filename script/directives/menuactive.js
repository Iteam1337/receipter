
angular.module('receipter').directive('menuactive', function($location) {

  'use strict';

  var getHref = function(element) {
    var href = element[0].getAttribute('href');

    if(href) {
      return href;
    } else {
      var aTags = element[0].getElementsByTagName('a');
      for(var ix in aTags) {
        href = aTags[ix].getAttribute('href');
        if(href) {
          return href;
        }
      }
    }
  };

  return {
    restrict: 'A',
    scope: {
      menuactive: '@'
    },
    link: function(scope, element) {

      var trailingSlash = /(\/$)/;
      
      var setSelected = function() {
        var url = $location.path().replace(trailingSlash, '');
        var href = getHref(element).replace(trailingSlash, '').replace('#', '');

        var isSelected = (href === '' && url === '') || (href !== '' && url.indexOf(href) === 0);
        if(isSelected) {
          element.addClass(scope.menuactive);
        } else {
          element.removeClass(scope.menuactive);
        }
      };

      scope.$on("$routeChangeSuccess", setSelected);
      scope.$on("$stateChangeSuccess", setSelected);
      setSelected();

    }
  };

});