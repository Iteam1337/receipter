
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

  var defaults = {
    quality: 50,
    sourceType: Camera.PictureSourceType.CAMERA,
    destinationType: Camera.DestinationType.DATA_URL,
    encodingType: Camera.EncodingType.JPEG,
    mediaType: Camera.MediaType.ALLMEDIA,
    direction: Camera.Direction.FRONT
  };

  function replaceOptions(options, defaults) {
    Object.keys(defaults).forEach(function(key) {
      if('number' !== typeof options[key]) {
        options[key] = defaults[key];
      }
    });
    return options;
  }

  function callback(callbackFunction, self, _arguments) {
    if(callbackFunction) {
      var args = Array.prototype.slice.call(_arguments);
      $rootScope.$apply(function() {
        callbackFunction.apply(self, args);
      });
    }
  }

  function getPicture(success, error, options) {

    options = replaceOptions(options || {}, defaults);
    
    if(options.encodingType === Camera.EncodingType.PNG) {
      delete options['quality'];
    }

    $window.navigator.camera.getPicture(
      function () {
        callback(success, this, arguments);
      },
      function() {
        callback(error, this, arguments);
      },
      options);
  }

  function cleanup(success, error) {
    $window.navigator.camera.cleanup(
      function () {
        callback(success, this, arguments);
      },
      function() {
        callback(error, this, arguments);
      });
  }

  return angular.extend(Camera, {
    getPicture: getPicture,
    cleanup: cleanup
  });

});