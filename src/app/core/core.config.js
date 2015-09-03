(function () {
    'use strict';

    var core = angular.module('app.core');

    core.config(interceptorConfig);
    interceptorConfig.$inject = ['$httpProvider']; 
    function interceptorConfig($httpProvider) {
      $httpProvider.interceptors.push('ylHttpInterceptor');
    }

    core.config(toastrConfig);

    /* @ngInject */
    toastrConfig.$inject = ['toastr'];
    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    /*@DetectConfigHelper*/
    // core.constant('configApi', {});
    getConfigApi.$inject = ['detectConfigHelper'];
    function getConfigApi(){
      var configApi = detectConfigHelper.current();
      core.constant('configApi', configApi);
    }

    var config = {
        appErrorPrefix: '[Youlook Error] ',
        appTitle: 'Youlook'
    };
    core.value('config', config);

    core.config(configure);
    configure.$inject = ['$locationProvider', '$logProvider', 'routerHelperProvider', 'exceptionHandlerProvider', '$translateProvider'];
    /* @ngInject */
    function configure($locationProvider, $logProvider, routerHelperProvider, exceptionHandlerProvider, $translateProvider) {
      if ($logProvider.debugEnabled) {
          $logProvider.debugEnabled(true);
      }
      exceptionHandlerProvider.configure(config.appErrorPrefix);
      routerHelperProvider.configure({docTitle: config.appTitle + ' | '});

      //---Translate
      $translateProvider.useLoader('customTranslateLoader', { 
        prefix: 'data/langs/',
        suffix: '.json' 
      });
      /* location and route configuration stuff... */
      $translateProvider.preferredLanguage('vi');
      // $translateProvider.useCookieStorage();
      $translateProvider.useLocalStorage();
      // Enable escaping of HTML
      $translateProvider.useSanitizeValueStrategy('escaped');
    }
})();
