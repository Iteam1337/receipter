
angular.module('receipter').controller('UploadController', function($scope, notification, camera) {
  'use strict';
  //data:image/jpeg;base64,{{imagedata}} 

  $scope.imagesource = 'img/shutter.png';

  this.alert = function() {
    notification.alert('alert', function() {
      alert(Array.prototype.slice.call(arguments).join('\n'));
    });
  };

  this.confirm = function() {
    notification.confirm('confirm', function() {
      alert(Array.prototype.slice.call(arguments).join('\n'));
    }, 'Question', ['OK', 'ABORT!']);
  };

  this.prompt = function() { // message, callback, title, buttonLabels, defaultText
    notification.confirm('give it to me', function() {
      alert(Array.prototype.slice.call(arguments).join('\n'));
    }, 'Prompt', ['OK', 'ABORT!']);
  };

  this.beep = function() {
    notification.beep(1);
  };

  this.vibrate = function() {
    notification.vibrate(500);
  };

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