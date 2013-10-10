
describe('menuactive', function() {

  var $rootScope,
      $compile,
      scope,
      path;

  beforeEach(function() {

    path = sinon.stub();

    module('receipter', function($provide) {
      $provide.value('$location', { path: path });
    });

    inject(function(_$rootScope_, _$compile_) {
      $compile = _$compile_;
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
    });
  });

  it('should call $location.path() on load', function() {
    path.returns('/');
    $compile('<a href="/foo" menuactive="foo">Hello</a>')(scope);
    scope.$digest();
    expect(path.calledOnce).to.be.true;
  });

  it('should set the provided class when link is selected on load', function() {
    path.returns('/foo/bar');
    var elem = $compile('<a href="/foo" menuactive="foo">Hello</a>')(scope);
    scope.$digest();
    expect(elem.hasClass('foo')).to.be.true;
  });

  it('should not set the provided class when link is not selected on load', function() {
    path.returns('/bar');
    var elem = $compile('<a href="/foo" menuactive="bar">Hello</a>')(scope);
    scope.$digest();
    expect(elem.hasClass('bar')).to.be.false;
  });

  it('should call $location.path() on navigate', function() {
    path.returns('/');
    var elem = $compile('<a href="/foo" menuactive="foo">Hello</a>')(scope);
    scope.$digest();
    expect(path.calledOnce, 'path called once').to.be.true;
    $rootScope.$broadcast('$routeChangeSuccess');
    expect(path.calledTwice, 'path called twice').to.be.true;
  });

  it('should call $location.path() on navigate with stateChange', function() {
    path.returns('/');
    var elem = $compile('<a href="/foo" menuactive="foo">Hello</a>')(scope);
    scope.$digest();
    expect(path.calledOnce, 'path called once').to.be.true;
    $rootScope.$broadcast('$stateChangeSuccess');
    expect(path.calledTwice, 'path called twice').to.be.true;
  });

  it('should set the provided class when link is selected on navigate', function() {
    // initially false
    path.returns('/bar');
    var elem = $compile('<a href="/foo" menuactive="foo">Hello</a>')(scope);
    scope.$digest();
    expect(elem.hasClass('foo'), 'no class foo').to.be.false;

    // navigate
    path.returns('/foo');
    $rootScope.$broadcast('$routeChangeSuccess');
    scope.$digest();
    expect(elem.hasClass('foo'), 'has class foo').to.be.true;
  });

  it('should not set the provided class when link is not selected on navigate', function() {
    // initially true
    path.returns('/foo');
    var elem = $compile('<a href="/foo" menuactive="foo">Hello</a>')(scope);
    scope.$digest();
    expect(elem.hasClass('foo'), 'has class foo').to.be.true;

    // navigate
    path.returns('/bar');
    $rootScope.$broadcast('$routeChangeSuccess');
    scope.$digest();
    expect(elem.hasClass('foo'), 'no class foo').to.be.false;

  });

  it('handles trailing slashes', function() {
    path.returns('/foo');
    var elem = $compile('<a href="/foo/" menuactive="foo">Hello</a>')(scope);
    scope.$digest();
    expect(elem.hasClass('foo'), 'has class foo').to.be.true;
  });

  it('finds href from child if not present on element', function() {
    path.returns('/foo');
    var elem = $compile('<li menuactive="foo"><i></i><span><a href="/foo/">Hello</a></span></li>')(scope);
    scope.$digest();
    expect(elem.hasClass('foo'), 'has class foo').to.be.true;
  });

  it('removes # from comparison', function() {
    path.returns('/foo');
    var elem = $compile('<li menuactive="bar"><i></i><span><a href="#/foo/">Hello</a></span></li>')(scope);
    scope.$digest();
    expect(elem.hasClass('bar'), 'has class bar').to.be.true;
  });

});