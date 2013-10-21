
angular.module('receipter').controller('HomeController', function($scope, $routeParams, $location) {

  'use strict';

  this.selectAndFilter = function() {
    var client = $location.search().client;
    $scope.receipts = $scope.data.receipts.map(function(r) {
      r.selected = ('' + r.id) === $routeParams.id;
      return r;
    }).filter(function(r) {
      return !client || r.client.name.toLowerCase() === client.replace('%20', ' ');
    });
  };

  this.selectAndFilter();

});