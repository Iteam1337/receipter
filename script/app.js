
angular
  .module('receipter', [ 'ngTouch', 'ngAnimate', 'ui.router' ])
  .config(function($locationProvider, $stateProvider, $urlRouterProvider) {

    'use strict';
    $locationProvider.html5Mode(false);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('upload', {
        url: '/upload',
        templateUrl: 'partials/upload.html'
      });
  });