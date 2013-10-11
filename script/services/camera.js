
angular.module('receipter').service('camera', function($window, $rootScope) {

  'use strict';

  // fallback for desktop testing
  var Camera = Camera || {
    PictureSourceType: {
      PHOTOLIBRARY : 0,
      CAMERA : 1,
      SAVEDPHOTOALBUM : 2
    },
    DestinationType: {
      DATA_URL : 0,
      FILE_URI : 1,
      NATIVE_URI : 2
    },
    EncodingType: {
      JPEG : 0,
      PNG : 1
    },
    MediaType: {
      PICTURE: 0,
      VIDEO: 1,
      ALLMEDIA : 2
    },
    Direction: {
      BACK : 0,
      FRONT : 1
    }
  };

  return angular.extend(Camera, {
    getPicture: function(success, error, options) {
      $window.navigator.camera.getPicture(
        function () {
          var self = this
            , args = Array.prototype.slice.call(arguments);
          if(success) {
            $rootScope.$apply(function() {
              success.apply(self, args);
            });
          }
        },
        function() {
          var self = this
            , args = Array.prototype.slice.call(arguments);
          if(error) {
            $rootScope.$apply(function() {
              error.apply(self, args);
            });
          }
        },
        options);
    },
    cleanup: function(success, error) {
      $window.navigator.camera.cleanup(
        function () {
          var self = this
            , args = Array.prototype.slice.call(arguments);
          if(success) {
            $rootScope.$apply(function() {
              success.apply(self, args);
            });
          }
        },
        function() {
          var self = this
            , args = Array.prototype.slice.call(arguments);
          if(error) {
            $rootScope.$apply(function() {
              error.apply(self, args);
            });
          }
        });
    });
  };

});