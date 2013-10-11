
describe('camera', function() {

  var camera,
    appCamera,
    rootScope;

  beforeEach(function() {

    appCamera = {
      getPicture: sinon.stub(),
      cleanup: sinon.stub()
    };

    module('receipter', function($provide) {
      $provide.value('$window', { navigator: { camera: appCamera } }); // $window.navigator.camera
    });
    inject(function($injector, $rootScope) {
      camera = $injector.get('camera');
      rootScope = $rootScope;
    });
  });

  describe('settings', function() {
    it('containts PictureSourceType', function() {
      expect(camera.PictureSourceType).to.be.an('Object');
      expect(camera.PictureSourceType).to.eql({
        PHOTOLIBRARY : 0,
        CAMERA : 1,
        SAVEDPHOTOALBUM : 2
      });
    });
    it('containts DestinationType', function() {
      expect(camera.DestinationType).to.be.an('Object');
      expect(camera.DestinationType).to.eql({
        DATA_URL : 0,
        FILE_URI : 1,
        NATIVE_URI : 2
      });
    });
    it('containts EncodingType', function() {
      expect(camera.EncodingType).to.be.an('Object');
      expect(camera.EncodingType).to.eql({
        JPEG : 0,
        PNG : 1
      });
    });
    it('containts MediaType', function() {
      expect(camera.MediaType).to.be.an('Object');
      expect(camera.MediaType).to.eql({
        PICTURE: 0,
        VIDEO: 1,
        ALLMEDIA : 2
      });
    });
    it('containts Direction', function() {
      expect(camera.Direction).to.be.an('Object');
      expect(camera.Direction).to.eql({
        BACK : 0,
        FRONT : 1
      });
    });
  });
  
  describe('getPicture', function() {
    it('calls the correct method on the app camera', function() {
      camera.getPicture();
      expect(appCamera.getPicture.calledOnce).to.be.true;
    });
    it('calls success callback on success', function() {
      var success = sinon.spy();
      var error = sinon.spy();
      camera.getPicture(success, error);
      appCamera.getPicture.callArg(0);
      rootScope.$digest();
      expect(success.calledOnce).to.be.true;
      expect(error.calledOnce).to.be.false;
    });
    it('calls error callback on error', function() {
      var success = sinon.spy();
      var error = sinon.spy();
      camera.getPicture(null, error);
      appCamera.getPicture.callArg(1);
      rootScope.$digest();
      expect(success.calledOnce).to.be.false;
      expect(error.calledOnce).to.be.true;
    });
    it('passes the correct default parameters', function() {
      camera.getPicture();
      expect(appCamera.getPicture.firstCall.args[2]).to.eql({
        quality: 50,
        sourceType: camera.PictureSourceType.CAMERA,
        destinationType: camera.DestinationType.DATA_URL,
        encodingType: camera.EncodingType.JPEG,
        mediaType: camera.MediaType.ALLMEDIA,
        direction: camera.Direction.FRONT
      });
    });
    it('merges the parameters correctly', function() {
      camera.getPicture(null, null, {
        mediaType: camera.MediaType.VIDEO
      });
      expect(appCamera.getPicture.firstCall.args[2]).to.eql({
        quality: 50,
        sourceType: camera.PictureSourceType.CAMERA,
        destinationType: camera.DestinationType.DATA_URL,
        encodingType: camera.EncodingType.JPEG,
        mediaType: camera.MediaType.VIDEO,
        direction: camera.Direction.FRONT
      });
    });
    it('merges the parameters correctly for PNG', function() {
      camera.getPicture(null, null, {
        encodingType: camera.EncodingType.PNG
      });
      var options = appCamera.getPicture.firstCall.args[2];

      expect(options.sourceType, 'pictureSourceType').to.eql(camera.PictureSourceType.CAMERA);
      expect(options.destinationType, 'destinationType').to.eql(camera.DestinationType.DATA_URL);
      expect(options.encodingType, 'encodingType').to.eql(camera.EncodingType.PNG);
      expect(options.mediaType, 'mediaType').to.eql(camera.MediaType.ALLMEDIA);
      expect(options.direction, 'direction').to.eql(camera.Direction.FRONT);
      expect(options.quality, 'quality').to.be.undefined;
    });
  });

  describe('cleanup', function() {
    it('calls into success callback on success', function() {
      var success = sinon.spy();
      var error = sinon.spy();
      camera.cleanup(success, error);
      appCamera.cleanup.callArg(0);
      rootScope.$digest();
      expect(success.calledOnce).to.be.true;
      expect(error.called).to.be.false;
    });
    it('calls into error callback on error', function() {
      var success = sinon.spy();
      var error = sinon.spy();
      camera.cleanup(success, error);
      appCamera.cleanup.callArg(1);
      rootScope.$digest();
      expect(success.called).to.be.false;
      expect(error.calledOnce).to.be.true;
    });
  });

});