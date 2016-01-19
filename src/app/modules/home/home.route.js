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
