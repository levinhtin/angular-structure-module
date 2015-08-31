(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  /* @ngInject */
  appRun.$inject = ['$rootScope', 'detectDevice', 'routerHelper', 'authHelper'];
  function appRun($rootScope, detectDevice, routerHelper, authHelper) {
    /*@Detect Device*/
    console.log('isMobile: ' + detectDevice.isMobile());
    $rootScope.isMobile = detectDevice.isMobile();
    /*@Route*/
    routerHelper.configureWhen('', '/');
    var otherwise = '/404';
    routerHelper.configureStates(getStates(), otherwise);

    /*@Authentication*/
    console.log('isAuth: ' + authHelper.authenticated());

  }

  /*@Route using*/
  function getStates() {
      return [
        {
          state: '404',
          config: {
              url: '/404',
              templateUrl: '/src/app/core/404.html',
              title: '404'
          }
        }
      ];
    }

})();
