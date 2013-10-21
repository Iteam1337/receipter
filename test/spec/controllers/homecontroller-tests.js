
describe('HomeController', function() {

  var controller, scope, routeParams;

  beforeEach(function() {

    routeParams = {
      id: '3'
    };

    module('receipter');
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      scope.data = { receipts: [{id:1}, {id:2,selected:true}, {id:3}] };
      controller = $controller('HomeController', {
        $scope: scope,
        $routeParams: routeParams
      });
    });
  });

  it('is registered correctly', function() {
    expect(controller).to.be.an('Object');
  });

  describe('select', function() {
    it('marks the receipt as selected and sets selected to false for the rest', function() {
      expect(scope.data.receipts).to.eql([{id:1,selected:false}, {id:2,selected:false}, {id:3,selected:true}]);
    });
  });

});