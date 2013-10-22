
describe('UploadController', function() {

  var controller, scope, notification, camera;

  beforeEach(function() {

    camera = {
      getPicture: sinon.stub(),
      PictureSourceType: {
        SAVEDPHOTOALBUM: 1
      },
      cleanup: sinon.spy()
    };

    notification = {
      alert: sinon.spy()
    };

    module('receipter');
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('UploadController', {
        $scope: scope,
        notification: notification,
        camera: camera
      });
    });
  });

  it('is registered correctly', function() {
    expect(controller).to.be.an('Object');
  });

  describe('new receipt', function() {
    it('creates an empty receipt object if none exists', function() {
      expect(scope.receipt).to.be.an('Object');
    });
    it('sets image to img/shutter.png as default', function() {
      expect(scope.receipt.image).to.equal('img/shutter.png');
    });
    describe('upload()', function() {
      it('gives the new receipt an id by adding to existing max', function() {
        scope.receipt = {};
        scope.data = { receipts: [ { id: 1 }, { id: 2 } ] };
        scope.upload();

        expect(scope.data.receipts).to.have.length(3);
        expect(scope.data.receipts[2].id).to.equal(3);
      });
    });

    xdescribe('picture', function() {

      describe('new picture', function() {

        describe('success', function() {
          it('calls getPicture on camera with default parameters', function() {
            scope.newPicture();
            expect(camera.getPicture).to.have.been.calledOnce;
            expect(camera.getPicture.getCall(0).args).to.have.length(2);
            expect(camera.getPicture.getCall(0).args[0]).to.be.a('function');
            expect(camera.getPicture.getCall(0).args[1]).to.be.a('function');
          });
          it('sets the result as an image on receipt', function() {
            scope.newPicture();
            camera.getPicture.callArgWith(0, 'imagedata');
            expect(scope.receipt.image).to.equal('data:image/jpeg;base64,imagedata');
          });
          it('cleans up afterwards', function() {
            scope.newPicture();
            camera.getPicture.callArgWith(0, 'imagedata');
            expect(camera.cleanup).to.have.been.calledOnce;
          });
        });

        describe('fail', function() {
          it('displays an error message if something goes wrong', function() {
            scope.newPicture();
            camera.getPicture.callArgWith(1, 'It borked!');
            expect(notification.alert).to.have.been.calledOnce;
            expect(notification.alert.getCall(0).args[0]).to.equal('It borked!');
            expect(notification.alert.getCall(0).args[1]).to.be.a('function');
            expect(notification.alert.getCall(0).args[2]).to.equal('Something went wrong');
            expect(notification.alert.getCall(0).args[3]).to.equal('Oh darn!');
          });
          it('cleans up afterwards', function() {
            scope.newPicture();
            camera.getPicture.callArgWith(1, 'It borked!');
            expect(camera.cleanup).to.have.been.calledOnce;
          });
        });
      });
      describe('picture from library', function() {
        describe('success', function() {
          it('calls getPicture on camera with correct sourceType parameter', function() {
            scope.pictureFromLibrary();
            expect(camera.getPicture).to.have.been.calledOnce;
            expect(camera.getPicture.getCall(0).args).to.have.length(3);
            expect(camera.getPicture.getCall(0).args[0]).to.be.a('function');
            expect(camera.getPicture.getCall(0).args[1]).to.be.a('function');
            expect(camera.getPicture.getCall(0).args[2]).to.eql({ sourceType: camera.PictureSourceType.SAVEDPHOTOALBUM });
          });
          it('sets the result as an image on receipt', function() {
            scope.pictureFromLibrary();
            camera.getPicture.callArgWith(0, 'imagedata');
            expect(scope.receipt.image).to.equal('data:image/jpeg;base64,imagedata');
          });
          it('cleans up afterwards', function() {
            scope.pictureFromLibrary();
            camera.getPicture.callArgWith(0, 'imagedata');
            expect(camera.cleanup).to.have.been.calledOnce;
          });
        });

        describe('fail', function() {
          it('displays an error message if something goes wrong', function() {
            scope.pictureFromLibrary();
            camera.getPicture.callArgWith(1, 'It borked!');
            expect(notification.alert).to.have.been.calledOnce;
            expect(notification.alert.getCall(0).args[0]).to.equal('It borked!');
            expect(notification.alert.getCall(0).args[1]).to.be.a('function');
            expect(notification.alert.getCall(0).args[2]).to.equal('Something went wrong');
            expect(notification.alert.getCall(0).args[3]).to.equal('Oh darn!');
          });
          it('cleans up afterwards', function() {
            scope.pictureFromLibrary();
            camera.getPicture.callArgWith(1, 'It borked!');
            expect(camera.cleanup).to.have.been.calledOnce;
          });
        });
      });
    });
  });

});