
describe('HomeController', function() {

  var controller, scope, routeParams, location;

  beforeEach(function() {

    routeParams = {
    };

    location = {
      search: sinon.stub().returns({})
    };

    module('receipter');
    inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      scope.data = {
        receipts: [
          { id:1, client: { name:'TRR' } },
          { id:2, client: { name:'Radical FM' } },
          { id:3, client: { name:'TRR' } }
        ]
      };
      controller = $controller('HomeController', {
        $scope: scope,
        $routeParams: routeParams,
        $location: location
      });
    });
  });

  it('is registered correctly', function() {
    expect(controller).to.be.an('Object');
  });

  describe('select', function() {
    it('marks the receipt as selected and sets selected to false for the rest', function() {
      routeParams.id = '2';
      controller.selectAndFilter();
      expect(scope.receipts[0].selected).to.be.false;
      expect(scope.receipts[1].selected).to.be.true;
      expect(scope.receipts[2].selected).to.be.false;
    });
  });

  describe('filter', function() {
    it('filters list by selected client', function() {
      location.search.returns({client: 'trr'});
      controller.selectAndFilter();
      expect(scope.receipts).to.have.length(2);
      expect(scope.receipts[0].id).to.equal(1);
      expect(scope.receipts[1].id).to.equal(3);
    });
    it('filters list by selected client with %20', function() {
      location.search.returns({client: 'radical%20fm'});
      controller.selectAndFilter();
      expect(scope.receipts).to.have.length(1);
      expect(scope.receipts[0].id).to.equal(2);
    });
  });

});