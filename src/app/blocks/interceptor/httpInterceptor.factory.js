(function() {
    'use strict';
    angular.module('blocks.interceptor')
    .factory('ylHttpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q'];

		function httpInterceptor($q) {
		  return {
		    request: function(config) {
		      // alert('Request intercepted.');
		      config.headers = config.headers || {};
          // if ($localStorage.token) {
          //     config.headers.Authorization = 'Bearer ' + $localStorage.token;
          // }
		      return config || $q.when(config);
		    }, 
		    requestError: function(config) {
		      return config;
		    },

		    response: function(res) {
		      return res;
		    },

		    responseError: function(res) {
		      return res;
		    }
		  };
		}
})();