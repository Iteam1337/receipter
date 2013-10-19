
angular.module('receipter').controller('AppController', function($scope) {

  'use strict';

  $scope.clients = ['Iteam', 'Radical.Fm'];

  $scope.filterClients = function (client) {
    $scope.selectedClient = client;
  };

});