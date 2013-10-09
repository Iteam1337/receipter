
angular
  .module('receipter', [ 'ngTouch', 'ngAnimate', 'ui.router', 'PhoneGap' ])
  .config(function($locationProvider, $stateProvider, $urlRouterProvider) {

    'use strict';

    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'partials/home.html'
      })
      .state('foo', {
        url: '/foo',
        templateUrl: 'partials/foo.html'
      })
      .state('bar', {
        url: '/bar',
        templateUrl: 'partials/bar.html'
      });
  });