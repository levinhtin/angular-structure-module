(function () {
    'use strict';

    angular
        .module('app.module.admin')
        .controller('AdminController', AdminController);

    AdminController.$inject = ['logger', '$http'];
    /* @ngInject */
    function AdminController(logger, $http) {
        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            logger.info('Activated Admin View');
            $http({
                method: 'GET',
                url: 'http://api.alpha.youlook.net:7755/paths/types?limit=9999&page=1',
                success: function(res){
                    console.log(res);
                },
                error: function(res){
                    console.log(res);
                }
            });
        }
    }
})();
