(function () {
    'use strict';

    angular
        .module('app.module.feed')
        .factory('feedService', feedService);

    /* @ngInject */
    feedService.$inject = ['$http', '$q', 'exception', 'logger'];
    function feedService($http, $q, exception, logger) {
        var service = {
            getFeeds: getFeeds
        };

        return service;

        function getFeeds() {
            return $http.get('/feeds')
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getPeople')(e);
            }
        }
    }
})();
