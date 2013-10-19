
angular.module('receipter').controller('HomeController', function($scope) {

  'use strict';
<<<<<<< HEAD

  $scope.select = function(receipt) {
    $scope.data.receipts = $scope.data.receipts.map(function(r) {
      r.selected = r.id === receipt.id;
      return r;
    });
  };
=======
  
  $scope.receipts = [
    {
      "title": "Öl",
      "client": "Iteam",
      "date": "2013-11-12"
    },
    {
      "title": "Öl",
      "client": "Iteam",
      "date": "2013-11-12"
    },
    {
      "title": "Öl",
      "client": "Radical.Fm",
      "date": "2013-11-12"
    }
  ];
>>>>>>> 016aa75910f5b0be351a17df982679dcad62f192

});