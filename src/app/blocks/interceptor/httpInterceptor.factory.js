(function() {
    'use strict';
    angular.module('blocks.interceptor')
    .factory('ylHttpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$cookies'];

		function httpInterceptor($q, $cookies) {
		  return {
		    request: function(config) {
		      // alert('Request intercepted.');
		      config.headers = config.headers || {};
		      config.headers['Content-Type'] = 'application/json';
        	config.headers['Accept'] = 'application/json';
        	// config.headers['Access-Control-Allow-Origin'] = '*';

          if ($cookies.get('access-token')) {
              config.headers['Access-Token'] = $cookies.get('access-token');
          }
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