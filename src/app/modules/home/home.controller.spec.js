describe('HomeController', function() {
  var controller, $scope;
  beforeEach(function($rootScope, _$controller) {
    // module('app.core');
    // module('app.widgets');
    module('app.module.home');
    // scope = $rootScope.$new();
    // controller = $controller('HomeController', {
    //   $scope: scope
    // });
    controller = _$controller;

  });
  describe('Initialize', function() {
    describe('action', function() {
      it('should be equal', function() {
        expect(1).toEqual(1);
      });
    });
  });
});
