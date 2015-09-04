(function () {
  'use strict';

  angular
    .module('app.components.userAuth')
    .controller('UserAuthController', UserAuthController);

  /* @ngInject */
  UserAuthController.$inject = ['$q', 'logger', 'authHelper' , 'ngDialog'];
  function UserAuthController($q, logger, authHelper, ngDialog) {
    /* @Initialize */
    var self = this;
    self.userInfo = authHelper.getUserInfo();
    /* @Definition */
    self.login = login;
    self.logout = logout;

    /* @Init Action */
    init();
    activate();

    /* @Implimentation */
    function init(){
      
    }

    function activate() {
      // var promises = [getMessageCount(), getPeople()];
      var promises = [];
      return $q.all(promises).then(function() {
          logger.info('Activated Dashboard View');
      });
    }

    function login(){
      console.log('call popup login');
      ngDialog.open({ 
        template: 'src/app/components/userAuth/userPopSignIn.html',
        className: 'ngdialog-theme-default',
        controller: 'UserPopSignInController',
        controllerAs: 'userPopSignIn',
        preCloseCallback: function(data) {
          if(data && data != '$closeButton' && data != '$document'){
            authHelper.login('auth/login', data).then(function(res){
              self.userInfo = res.data.user;
              console.log(res);
            });
          }
        }
      });
    }
    function logout(){
      authHelper.logout('auth/logout').then(function(res){
        console.log(res);
      });
    }

    function loginWithFb(){
      self.loadingFb = true;
      authService.loginWithFB(function(res){
        action.get("auth/facebook-login?access_token="+res.accessToken, function(res){
          switch(res.meta.code){
            case 200:
              authService.setLogin(res.data.user);
              if(typeof res.data.user.total_app != "undefined" && res.data.user.total_app > 0 )
                $location.path('/me/apps');
              else
                $location.path('/templates');
            break;
            default:
              if(typeof res.meta.message != "undefined")
                toaster.pop('error', '', res.meta.message);
            break;
          }
          self.loadingFb = false;
        }, function(res){
          // if(typeof res.meta.message != "undefined")
          //   toaster.pop('error', '', res.meta.message);
          self.loadingFb = false;
        });
      });
    }
  }
})();
