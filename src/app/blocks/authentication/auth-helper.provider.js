/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('blocks.authentication')
        .provider('authHelper', authHelperProvider);

    authHelperProvider.$inject = [];
    /* @ngInject */
    function authHelperProvider() {

        // this.configure = function(cfg) {
        //     angular.extend(config, cfg);
        // };

        this.$get = AuthHelper;
        AuthHelper.$inject = ['$cookies', '$cookieStore'];
        /* @ngInject */
        function AuthHelper($cookies, $cookieStore) {
            return {
              authenticated: authenticated,
              setLogin: setLogin,
              getUserInfo: getUserInfo,
              setUserInfo: setUserInfo,
              updateUserInfo: updateUserInfo,
              setToken: setToken,
              getToken: getToken,
              logout: logout
            };

            function authenticated(){
              var token = $cookies.get("token");
              if(token != undefined)
                return true;
              else 
                return false;
            }

            function setLogin(userInfo) {
              this.setUserInfo(userInfo);
              this.setToken(userInfo.access_token);
            }

            function getUserInfo(){
              return $cookieStore.get('userInfo');
            }

            function setUserInfo(userInfo){
              var userViewModel = convertUsertoViewmodel(userInfo)
              $cookieStore.put('userInfo',userViewModel);
            }

            function updateUserInfo(userViewModel){
              $cookieStore.put('userInfo',userViewModel);
            }

            function setToken(token){
              $cookieStore.put('token', token);
            }

            function getToken(){
              return $cookieStore.get('token') || '';
            }

            function logout(successCallback, errorCallback) {
              var token = $cookieStore.get('token');
              $cookieStore.remove('userInfo');
              $cookieStore.remove('token');
              return $http({
                url: HOST+"auth/logout",
                method: "POST",
                headers: headersHttp.post(),
              }).success(function(res, status, headers, config){
                if (typeof successCallback == "function")
                  successCallback(res);
              }).error(function(res, status, headers, config){
                if (typeof errorCallback == "function") 
                  errorCallback(res);
              });
            }
        }
    }
})();
