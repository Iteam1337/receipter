
angular
  .module('receipter', [ 'ngTouch', 'ngAnimate', 'ngRoute' ])
  .config(function($locationProvider, $routeProvider) {

    'use strict';
    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/receipts', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/receipts/:id', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/upload', {
        templateUrl: 'partials/upload.html',
        controller: 'UploadController'
      })
      .otherwise({
        redirectTo: '/receipts'
      });
  });