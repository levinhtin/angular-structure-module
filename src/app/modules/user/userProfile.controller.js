(function () {
  'use strict';

  angular
    .module('app.module.user')
    .controller('UserProfileController', UserProfileController);

  /* @ngInject */
  UserProfileController.$inject = ['$scope', '$q', '$stateParams', 'logger', 'userService'];
  function UserProfileController($scope, $q, $stateParams, logger, userService) {
    /* @Initialize */
    var self = this;
    self.userInfo = {};
    self.relations = [];
    self.params = {
      userId: $stateParams.userId
    };
    self.activities = [];
    self.isMe = $scope.isMe;
    self.mutualFriends = [];

    /* @Definition */

    /* @Init Action */
    init();
    activate();

    /* @Implimentation */
    function init(){
      // userService.login('auth/login', {'username': 'tinlvv@greenglobal.vn', 'password': '123123'});
      getRelations(self.params.userId);
      getActivities(self.params.userId, 1, 10);
      if(self.userIdCurent && self.params.userId && self.userIdCurent != self.params.userId){
        getMutualFriend(self.params.userId, 1, 5);
      }
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

    function getMutualFriend(userId, page, limit){
      userService.getMutualFriend(userId, page, limit).then(function(res){
        if(res.success){
          self.mutualFriends = res.data.items;
        }
      });
    }

    function getActivities(userId, page, limit){
      userService.getActivities(userId, page, limit).then(function(res){
        if(res.success){
          self.activities = res.data.items;
        }
      });
    }
  }
})();
