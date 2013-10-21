
angular.module('receipter').controller('HomeController', function($scope, $routeParams) {

  'use strict';

  $scope.data.receipts = $scope.data.receipts.map(function(r) {
    r.selected = ('' + r.id) === $routeParams.id;
    return r;
  });

});