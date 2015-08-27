(function() {
    'use strict';

    angular
        .module('app.module.feeds')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'feeds',
                config: {
                    url: '/feeds',
                    templateUrl: 'src/app/modules/feeds/feeds.html',
                    controller: 'FeedsController',
                    controllerAs: 'vm',
                    resolve: { // Any property in resolve should return a promise and is executed before the view is loaded
                        loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
                            // you can lazy load files for an existing module
                            return $ocLazyLoad.load('/src/app/modules/feeds/feeds.controller.js');
                        }]
                    },
                    title: 'Feeds',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Feeds'
                    }
                }
            }
        ];
    }
})();
