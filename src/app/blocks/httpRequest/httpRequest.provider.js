/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('blocks.httpRequest')
        .provider('httpRequest', httpRequest);

    httpRequest.$inject = [];
    /* @ngInject */
    function httpRequest() {

        // this.configure = function(cfg) {
        //     angular.extend(config, cfg);
        // };

        this.$get = HttpRequestHelper;
        HttpRequestHelper.$inject = ['$q', '$http', 'exception','detectConfigHelper', 'logger'];
        /* @ngInject */
        function HttpRequestHelper($q, $http, exception, detectConfigHelper, logger) {
          var serverConfig = detectConfigHelper.current();
          return {
            get: get,
            getOtherUrl: getOtherUrl,
            post: post,
            put: put,
            del: del
          }

          function get(api){
            var request = $http({
              url: serverConfig.hostApi + api,
              method: "GET",
              headers: {
                'Content-Type': 'application/json'
              },
            }).then(handleSuccess, handleError);
            return request;
          }

          function getOtherUrl(api){
            return $http({
              url: api,
              method: 'GET',
              headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
              }
            }).then(handleSuccess, handleError);
          }

          function post(api, data){
            var request = {
              method: 'POST',
              url: serverConfig.hostApi + api,
              headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept':'application/json'
              }
            };
            if(data){
              request.data = $.param(data);
            }
            return $http(request).then(handleSuccess).catch(handleError);
          }

          function put(api, data){
            var request = {
              method: 'PUT',
              url: serverConfig.hostApi + api,
            };
            if(data){
              request.data = $.param(data);
            }
            return $http(request).then(handleSuccess).catch(handleError);
          }

          function del(api){
            var request = {
              url: serverConfig.hostApi + api,
              method: 'DELETE',
            };
            return $http(request).then(handleSuccess).catch(handleError);
          }

          /* @Handle Response */
          function handleError(data){
            logger.error(data.data);
            var result = {
              success: false,
              message: '',
              data: null,
              type: 'error'
            };
            if(data && data.status) {
              result.message = data.statusText;
              result.code = data.status;
            }
            return result;
          }

          function handleSuccess(data){
            var result = {
              success: true,
              message: '',
              data: null,
              type: 'success'
            };
            if(data && data.status == 200){
              var dataP = data.data;
              switch(dataP.meta.code){
                case 200:
                  result.success = true;
                  result.message = dataP.meta.message;
                  result.data = dataP.data;
                  break;
                default:
                  result.success = false;
                  result.message = dataP.meta.message;
                  result.type = 'warning';
                  logger.error(dataP.meta.message);
                  break;
              };
            }
            else {
              result.success = false;
              result.message = data.statusText;
              result.type = 'error';
              logger.error(dataP.meta.message);
            }
            return result;
          }
        }

    }
})();
