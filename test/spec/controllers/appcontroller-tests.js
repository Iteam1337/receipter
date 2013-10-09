
describe('AppController', function() {

  var controller, scope;

  beforeEach(function() {
    module('receipter');
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('AppController', {
        $scope: scope
      });
    });
  });

  it('is registered correctly', function() {
    expect(controller).to.be.an('Object');
  });

});