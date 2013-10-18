
angular.module('receipter').controller('UploadController', function($scope, notification, camera) {
  'use strict';
  //data:image/jpeg;base64,{{imagedata}} 

  $scope.imagesource = 'img/shutter.png';

  $scope.newPicture = function() {
    camera.getPicture(
      function(data) {
        $scope.imagesource = 'data:image/jpeg;base64,' + data;
        camera.cleanup();
      },
      function() {});
  };

  $scope.pictureFromLibrary = function() {
    camera.getPicture(
      function(data) {
        $scope.imagesource = 'data:image/jpeg;base64,' + data;
        camera.cleanup();
      },
      function() {},
      {
        sourceType: camera.PictureSourceType.SAVEDPHOTOALBUM
      });
  };

});