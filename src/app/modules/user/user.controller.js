(function () {
  'use strict';

  angular
    .module('app.module.user')
    .controller('UserController', UserController);

  UserController.$inject = ['$q', 'dataservice', 'logger', 'userService'];
  /* @ngInject */
  function UserController($q, dataservice, logger, userService) {
    var vm = this;
    vm.news = {
      title: 'helloWorld',
      description: 'Hot Towel Angular is a SPA template for Angular developers.'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();
    userService.login('auth/login', {'username': 'tinlvv@greenglobal.vn', 'password': '123123'});

    function activate() {
      // var promises = [getMessageCount(), getPeople()];
      var promises = [];
      return $q.all(promises).then(function() {
          logger.info('Activated Dashboard View');
      });
    }
  }
})();
