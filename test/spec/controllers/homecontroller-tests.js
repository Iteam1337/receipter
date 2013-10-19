
describe('HomeController', function() {

  var controller, scope;

  beforeEach(function() {
    module('receipter');
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      controller = $controller('HomeController', {
        $scope: scope
      });
    });
  });

  it('is registered correctly', function() {
    expect(controller).to.be.an('Object');
  });

  describe('select', function() {
    it('marks the receipt as selected and sets selected to false for the rest', function() {
      scope.data = { receipts: [{id:1}, {id:2,selected:true}, {id:3}] };
      scope.select({id:3});
      expect(scope.data.receipts).to.eql([{id:1,selected:false}, {id:2,selected:false}, {id:3,selected:true}]);
    });
  });

});