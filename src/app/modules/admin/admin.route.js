(function() {
    'use strict';

    angular
        .module('app.module.admin')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'admin',
                config: {
                    url: '/admin',
                    templateUrl: 'src/app/modules/admin/admin.html',
                    controller: 'AdminController',
                    controllerAs: 'vm',
                    title: 'Admin',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Admin'
                    }
                }
            },
            {
                state: 'admin.user',
                config: {
                    url: '/user',
                    templateUrl: 'src/app/modules/admin/user.html',
                    controller: 'UserController',
                    controllerAs: 'vm',
                    title: 'User',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> User'
                    }
                }
            }
        ];
    }
})();
