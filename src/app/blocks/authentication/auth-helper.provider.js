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
        AuthHelper.$inject = ['$q', '$http', '$cookies', '$cookieStore', 'httpRequest'];
        /* @ngInject */
        function AuthHelper($q, $http, $cookies, $cookieStore, httpRequest) {
            return {
              authenticated: authenticated,
              setLogin: setLogin,
              getUserInfo: getUserInfo,
              setUserInfo: setUserInfo,
              updateUserInfo: updateUserInfo,
              setToken: setToken,
              getToken: getToken,
              logout: logout,
              login: login
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
              $cookieStore.put('userInfo', userInfo);
            }

            function updateUserInfo(userInfo){
              $cookieStore.put('userInfo', userInfo);
            }

            function setToken(token){
              // var access_token = token.replace(/"/g, '');
              $cookieStore.put('token', token);
            }

            function getToken(){
              return $cookieStore.get('token') || '';
            }

            function logout(api) {
              var token = $cookieStore.get('token');
              var userInfo = $cookieStore.get('userInfo');
              $cookieStore.remove('userInfo');
              $cookieStore.remove('token');
               return httpRequest.post(api).then(function(res){
                        return res;
                      });
            }

            function login(api, viewModel){
              return httpRequest.post(api, viewModel)
                      .then(function(res){
                        if(res.success){
                          setToken(res.data.access_token);
                          setUserInfo(res.data.user);
                        }
                        return res;
                      });
            }
        }
    }
})();
