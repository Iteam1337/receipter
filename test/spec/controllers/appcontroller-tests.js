
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

  describe('clients', function() {
    it('updates client list when receipts change', function() {
      scope.data.receipts = [{ client: { name: 'TRR' } }, { client: { name: 'RadicalFM' } }];
      scope.$digest();
      expect(scope.data.clients).to.eql([ { name: 'TRR' }, { name: 'RadicalFM' } ]);
    });
  });

  /*describe('#filterClients', function () {
    it('should select a client', function () {
      var client = 'Iteam';

      scope.filterClients(client);

      expect(scope.selectedClient).to.equal(client);
    });
  });

  describe('#showFilter', function () {
    it('should toggle the filter view', function () {
      scope.filterView = false;
      scope.showFilter();

      expect(scope.filterView).to.equal(true);
    });
  });*/

});