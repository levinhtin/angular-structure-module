describe('HomeController', function() {
  var controller, $scope, $rootScope;
  beforeEach(function() {
    module('app.module.home');
    inject(function($injector) {
      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      controller = $injector.get('$controller')('HomeController', { $scope: $scope });
      console.log($scope);
    });
  });

  describe('Action Handlers', function() {
    it('should be equal', function() {
      expect(controller.news.title).toEqual('helloWorld');
    });
  });
});
