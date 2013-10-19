
angular.module('receipter').controller('HomeController', function($scope) {

  'use strict';
  
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

});