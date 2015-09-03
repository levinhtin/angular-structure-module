(function () {
  'use strict';

  angular
    .module('app.module.user')
    .controller('UserProfileController', UserProfileController);

  /* @ngInject */
  UserProfileController.$inject = ['$q', '$stateParams', 'logger', 'userService'];
  function UserProfileController($q, $stateParams, logger, userService) {
    /* @Initialize */
    var self = this;
    self.userInfo = {};
    self.relations = [];
    self.params = {
      userId: $stateParams.userId
    };
    /* @Definition */

    /* @Init Action */
    init();
    activate();

    /* @Implimentation */
    function init(){
      // userService.login('auth/login', {'username': 'tinlvv@greenglobal.vn', 'password': '123123'});
      getRelations(self.params.userId);
    }

    function activate() {
      // var promises = [getMessageCount(), getPeople()];
      var promises = [];
      return $q.all(promises).then(function() {
          logger.info('Activated user profile View');
      });
    }

    function getRelations(userId){
      userService.getRelations(userId).then(function(res){
        self.relations = res.data.relations;
      })
    }
  }
})();
