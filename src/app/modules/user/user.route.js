(function() {
    'use strict';

    angular
        .module('app.module.user')
        .run(appRun);

    appRun.$inject = ['routerHelper', 'detectDevice'];
    /* @ngInject */
    function appRun(routerHelper, detectDevice) {
        routerHelper.configureStates(getStates(detectDevice.isMobile()));
    }

    function getStates(isMobile) {
      if(!isMobile){
        return [
          {
            state: 'user',
            config: {
                url: '/user/:userId',
                templateUrl: 'src/app/modules/user/user.html',
                controller: 'UserController',
                controllerAs: 'user',
                title: 'User',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-dashboard"></i> User'
                }
            }
          },
          {
            state: 'user.profile',
            config: {
                url: '/profile',
                templateUrl: 'src/app/modules/user/userProfile.html',
                controller: 'UserProfileController',
                controllerAs: 'profile',
                title: 'My Profile',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-dashboard"></i> User Profile'
                }
            }
          },
        ];
      } else {
        return [
          {
            state: 'user',
            config: {
                url: '/user/:userId',
                templateUrl: 'src/app/modules/user/user.adaptive.html',
                controller: 'UserController',
                controllerAs: 'vm',
                title: 'User',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-dashboard"></i> User'
                }
            }
          },
          {
            state: 'user.profile',
            config: {
                url: '/profile',
                templateUrl: 'src/app/modules/user/userProfile.adaptive.html',
                controller: 'UserProfileController',
                controllerAs: 'vm',
                title: 'My Profile',
                settings: {
                    nav: 1,
                    content: '<i class="fa fa-dashboard"></i> Profile adaptive'
                }
            }
          },
        ];
      }
    }
})();
