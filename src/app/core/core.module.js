(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize', 'oc.lazyLoad', 'ngCookies',
            'blocks.translate', 'blocks.detection', 'blocks.interceptor', 'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus'
        ]);
})();
