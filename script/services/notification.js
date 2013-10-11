
angular.module('receipter').service('notification', function($window, $rootScope) {
  'use strict';
  return {
    alert: function(message, callback, title, buttonName) {
      $window.navigator.notification.alert(message, function () {
        var self = this,
          args = Array.prototype.slice.call(arguments);

        if(callback) {
          $rootScope.$apply(function () {
            callback.apply(self, args);
          });
        }
      }, title, buttonName);
    },
    confirm: function(message, callback, title, buttonLabels) {
      $window.navigator.notification.confirm(message, function () {
        var self = this,
          args = Array.prototype.slice.call(arguments);

        if(callback) {
          $rootScope.$apply(function () {
            callback.apply(self, args);
          });
        }
      }, title, buttonLabels);
    },
    prompt: function(message, callback, title, buttonLabels, defaultText) {
      $window.navigator.notification.prompt(message, function() {
        var self = this,
          args = Array.prototype.slice.call(arguments);

        if(callback) {
          $rootScope.$apply(function() {
            callback.apply(self, args);
          });
        }
      }, title, buttomLabels, defaultText);
    },
    beep: function(times) {
      $window.navigator.notification.beep(times);
    },
    vibrate: function(milliseconds) {
      $window.navigator.notification.vibrate(milliseconds);
    }
  };

});