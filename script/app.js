
angular
  .module('receipter', [ 'ngTouch', 'ngAnimate', 'ngRoute' ])
  .config(function($locationProvider, $routeProvider) {

    'use strict';
    $locationProvider.html5Mode(false);

    $routeProvider
      .when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeController'
      })
      .when('/upload', {
        templateUrl: 'partials/upload.html',
        controller: 'UploadController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });