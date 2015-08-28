(function() {
    'use strict';

    angular
        .module('app.core')
        .run(appRun);

    /* @ngInject */
    appRun.$inject = ['routerHelper'];
    function appRun(routerHelper) {
        routerHelper.configureWhen('', '/');
        var otherwise = '/404';
        routerHelper.configureStates(getStates(), otherwise);
    }

    function getStates() {
        return [
            {
                state: '404',
                config: {
                    url: '/404',
                    templateUrl: '/src/app/core/404.html',
                    title: '404'
                }
            }
        ];
    }
})();
