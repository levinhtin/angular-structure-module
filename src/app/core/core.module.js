(function () {
  'use strict';
  angular
      .module('app.core', [
          'ngAnimate', 'ngSanitize', 'ngCookies', 'ngDialog',
          'blocks.httpRequest', 'blocks.translate', 'blocks.detection', 'blocks.interceptor', 'blocks.authentication', 'blocks.exception', 'blocks.logger', 'blocks.router',
          'ui.router'
      ]);
})();
