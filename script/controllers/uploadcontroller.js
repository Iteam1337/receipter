
angular.module('receipter').controller('UploadController', function($scope, notification, camera) {
  'use strict';
  //data:image/jpeg;base64,{{imagedata}} 

  $scope.imagesource = 'img/shutter.png';

  this.newPicture = function() {
    camera.getPicture(
      function(data) {
        $scope.imagesource = 'data:image/jpeg;base64,' + data;
        camera.cleanup();
      },
      function() {});
  };

  this.pictureFromLibrary = function() {
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