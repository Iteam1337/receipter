
angular.module('receipter').controller('UploadController', function($scope, $location) {
  'use strict';

  $scope.receipt = {
    image: 'img/shutter.png'
  };

  $scope.step = 'picture';

  $scope.gotoStep = function(step) {
    $scope.step = step;
  };

  $scope.upload = function() {
    $scope.receipt.date = new Date();
    $scope.receipt.id = $scope.data.receipts.reduce(function(max, cur) {
      return Math.max(max, cur.id);
    }, 0) + 1;
    $scope.data.receipts.push($scope.receipt);
    $scope.receipt = {
      image: 'img/shutter.png'
    };
    $location.path('/');
  };

  $scope.hasPicture = false;

  $scope.$watch('receipt.image', function () {
    if ($scope.receipt.image !== 'img/shutter.png') {
      $scope.hasPicture = true;
    }
  });


  /*
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
  */
});