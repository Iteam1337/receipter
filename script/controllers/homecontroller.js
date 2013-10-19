
angular.module('receipter').controller('HomeController', function($scope) {

  'use strict';

  $scope.select = function(receipt) {
    if (receipt.selected) {
      receipt.selected = false;
    } else {
      $scope.data.receipts = $scope.data.receipts.map(function(r) {
        r.selected = r.id === receipt.id;
        return r;
      });
    }
  };

});