(function () {
  'use strict';

  angular
    .module('app.components.userAuth')
    .controller('UserPopSignInController', UserPopSignInController);

  /* @ngInject */
  UserPopSignInController.$inject = ['$q', 'logger', 'authHelper' , 'ngDialog'];
  function UserPopSignInController($q, logger, authHelper, ngDialog) {
    /* @Initialize */
    var self = this;
    self.viewModel = {
      username: '',
      password: ''
    };

    /* @Definition */
    self.submit = submit;

    /* @Init Action */
    init();
    activate();

    /* @Implimentation */
    function init(){
      // userService.login('auth/login', {'username': 'tinlvv@greenglobal.vn', 'password': '123123'});
    }

    function activate() {
      // var promises = [getMessageCount(), getPeople()];
      var promises = [];
      return $q.all(promises).then(function() {
          logger.info('Activated User SignIn popup View');
      });
    }

    function submit(isValid){
      if(isValid){
        ngDialog.closeAll(self.viewModel);
      }
    }
  }
})();