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
