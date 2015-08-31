(function() {
    'use strict';

    angular
        .module('app.module.home')
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
                    state: 'home',
                    config: {
                        url: '/',
                        templateUrl: 'src/app/modules/home/home.html',
                        controller: 'HomeController',
                        controllerAs: 'vm',
                        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                                // you can lazy load files for an existing module
                                return $ocLazyLoad.load('/src/app/modules/home/home.controller.js');
                            }]
                        },
                        title: 'Home',
                        settings: {
                            nav: 1,
                            content: '<i class="fa fa-dashboard"></i> Home'
                        }
                    }
                }
            ];
            
        } else{
            return [
                {
                    state: 'home',
                    config: {
                        url: '/',
                        templateUrl: 'src/app/modules/home/home.adaptive.html',
                        controller: 'HomeController',
                        controllerAs: 'vm',
                        resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                            loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                                // you can lazy load files for an existing module
                                return $ocLazyLoad.load('/src/app/modules/home/home.controller.js');
                            }]
                        },
                        title: 'Home',
                        settings: {
                            nav: 1,
                            content: '<i class="fa fa-dashboard"></i> Home'
                        }
                    }
                }
            ];
        }
    }
})();
