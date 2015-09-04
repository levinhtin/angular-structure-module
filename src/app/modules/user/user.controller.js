(function () {
  'use strict';

  angular
    .module('app.module.user')
    .controller('UserController', UserController);

  /* @ngInject */
  UserController.$inject = ['$q', '$stateParams', 'logger', 'userService', 'authHelper'];
  function UserController($q, $stateParams, logger, userService, authHelper) {
    /* @Initialize */
    var self = this;
    self.userInfo = {};
    self.userCoverPhoto;
    self.params = {
      userId: $stateParams.userId,
    };
    self.mutualFriends = [];
    self.myCredit = 0;
    self.userIdCurent = authHelper.userIdCurent();
    self.isMe = self.params.userId == self.userIdCurent;
    self.activities = [];

    /* @Definition */

    /* @Init Action */
    init();
    activate();

    /* @Implimentation */
    function init(){
      // userService.login('auth/login', {'username': 'tinlvv@greenglobal.vn', 'password': '123123'});
      getInfo(self.params.userId);
      getCoverPhoto(self.params.userId);
      getActivities(self.params.userId, 1, 10);

      if(self.isMe){
        getTotalCredit(self.params.userId);
      }
      if(self.userIdCurent && self.params.userId && self.userIdCurent != self.params.userId){
        getMutualFriend(self.params.userId, 1, 5);
      }
    }

    function activate() {
      // var promises = [getMessageCount(), getPeople()];
      var promises = [];
      return $q.all(promises).then(function() {
          logger.info('Activated User View');
      });
    }

    /*@Using for user top*/
    function getInfo(userId){
      userService.getUserInfo(userId).then(function(res){
        if(res.success){
          self.userInfo = res.data.user;
        }
      });
    }

    function getCoverPhoto(userId){
      userService.getCoverPhoto(userId).then(function(res){
        if(res.data.photo != null){
          self.userCoverPhoto =  res.data.photo;
        };
      });
    }
    /**/

    function getMutualFriend(userId, page, limit){
      userService.getMutualFriend(userId, page, limit).then(function(res){
        if(res.success){
          self.mutualFriends = res.data.items;
        }
      });
    }

    function getTotalCredit(userId){
      userService.getTotalCredit(userId).then(function(res){
        if(res.success && res.data){
          self.myCredit = res.data;
        }
      })
    }

    function getActivities(userId, page, limit){
      userService.getActivities(userId, page, limit).then(function(res){
        if(res.success){
          self.activities = res.data;
        }
      });
    }
  }
})();
