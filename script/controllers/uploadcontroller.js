
angular.module('receipter').controller('UploadController', function($scope, notification, camera) {
  'use strict';

  $scope.receipt = {
    image: 'img/shutter.png'
  };

  var success = function(data) {
    $scope.receipt.image = 'data:image/jpeg;base64,' + data;
    camera.cleanup();
  };

  var fail = function(info) {
    notification.alert(info, function() {}, 'Something went wrong', 'Oh darn!');
    camera.cleanup();
  };

  $scope.newPicture = function() {
    camera.getPicture(success, fail);
  };

  $scope.pictureFromLibrary = function() {
    camera.getPicture(success, fail, { sourceType: camera.PictureSourceType.SAVEDPHOTOALBUM });
  };

});