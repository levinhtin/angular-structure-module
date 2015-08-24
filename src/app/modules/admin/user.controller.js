(function () {
    'use strict';

    angular
        .module('app.module.admin')
        .controller('UserController', UserController);

    UserController.$inject = ['logger'];
    /* @ngInject */
    function UserController(logger) {
        var vm = this;
        vm.title = 'User';

        activate();

        function activate() {
            logger.info('Activated Admin - User View');
        }
    }
})();
