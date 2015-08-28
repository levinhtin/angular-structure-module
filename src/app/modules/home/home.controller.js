(function () {
    'use strict';

    angular
        .module('app.module.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'logger', 'dataservice', 'authService'];
    /* @ngInject */
    function HomeController($q, logger, dataservice, authService) {
        var vm = this;
        vm.news = {
            title: 'helloWorld',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();
        authService.login('auth/login', {'username': 'tinlvv@greenglobal.vn', 'password': '123123'});

        function activate() {
            // var promises = [getMessageCount(), getPeople()];
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        };
    }
})();
