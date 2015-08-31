(function() {
  'use strict';
  
  angular
    .module('app.module.user')
    .service('userService', userService);

    userService.$inject = ['$rootScope', '$http', '$cookies', '$cookieStore', 'serverConfig'];

    function userService($rootScope, $http, $cookies, $cookieStore, serverConfig){
      this.login = function(urlString, params){
        var request = {
          method: 'POST',
          url: serverConfig.hostApi + urlString,
        };
        if(params){
          request.data = $.param(params);
        }
        return $http(request).then(function(data){
        	console.log(data);
        }, function(data){
        	console.log(data);
        });
      },

      this.logout = function(urlString){
        var request = $http({
          url: urlString,
          method: 'POST',
        }).then(function(data){
        	console.log(data);
        }, function(data){
        	console.log(data);
        });
        return request;
      },
 
      this.updateProfile = function(urlString, params){
        var request = {
          method: 'PUT',
          url: urlString,
        };
        if(params){
          request.data = $.param(params);
        }
        return $http(request).then(function(data){
        	console.log(data);
        }, function(data){
        	console.log(data);
        });
      },

      this.forgotPassword = function(urlString, success, error){
        return $http({
          url: urlString,
          method: 'GET',
        }).then(function(data){
        	console.log(data);
        }, function(data){
        	console.log(data);
        });
      }
    }
})();