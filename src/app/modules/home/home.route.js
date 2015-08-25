(function() {
    'use strict';

    angular
        .module('app.module.home')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
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
    }
})();
