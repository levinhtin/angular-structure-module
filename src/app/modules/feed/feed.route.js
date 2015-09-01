(function() {
    'use strict';

    angular
        .module('app.module.feed')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'feed',
                config: {
                    url: '/feed',
                    templateUrl: 'src/app/modules/feed/feed.html',
                    controller: 'FeedController',
                    controllerAs: 'vm',
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            // you can lazy load files for an existing module
                            return $ocLazyLoad.load('/src/app/modules/feed/feed.controller.js');
                        }]
                    },
                    title: 'Feed',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Feed'
                    }
                }
            }
        ];
    }
})();
