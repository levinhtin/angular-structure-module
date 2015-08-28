(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  /* @ngInject */
  appRun.$inject = ['$detectionDevice'];
  function appRun($detectionDevice) {
    console.log($detectionDevice.isMobile());
    // if($detectionDevice.isMobile != null){
    //   window.location.href = 'http://google.com';
    // }
  }
})();
