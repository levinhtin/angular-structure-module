(function() {
    'use strict';
    angular.module('blocks.interceptor')
    .factory('ylHttpInterceptor', httpInterceptor);

    httpInterceptor.$inject = ['$q', '$cookies', '$cookieStore'];

		function httpInterceptor($q, $cookies, $cookieStore) {
		  return {
		    request: function(config) {
		      // alert('Request intercepted.');
		      // config.headers = config.headers || {};
		      // config.headers['Content-Type'] = 'application/json';
        // 	config.headers['Accept'] = 'application/json';
        	// config.headers['Access-Control-Allow-Origin'] = '*';

          if ($cookieStore.get('token')) {
              config.headers['Access-Token'] = $cookieStore.get('token');
          }
		      return config || $q.when(config);
		    }, 
		    // requestError: function(config) {
		    //   return config;
		    // },

		    // response: function(res) {
		    //   return res;
		    // },

		    // responseError: function(res) {
		    //   return res;
		    // }
		  };
		}
})();