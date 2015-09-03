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
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('/src/app/modules/user/user.controller.js');
                    }]
                },
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
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('/src/app/modules/user/userProfile.controller.js');
                    }]
                },
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
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('/src/app/modules/user/user.controller.js');
                    }]
                },
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
                resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                    loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load('/src/app/modules/user/userProfile.controller.js');
                    }]
                },
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
