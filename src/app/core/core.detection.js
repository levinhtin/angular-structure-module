(function() {
  'use strict';

  angular
    .module('app.core')
    .run(appRun);

  /* @ngInject */
  function appRun($detectionDevice) {
    console.log($detectionDevice.isMobile());
    // if($detectionDevice.isMobile != null){
    //   window.location.href = 'http://google.com';
    // }
  }
})();
