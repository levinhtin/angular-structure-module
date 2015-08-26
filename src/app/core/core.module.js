(function () {
    'use strict';

    angular
        .module('app.core', [
            'ngAnimate', 'ngSanitize',
            'blocks.detection', 'blocks.interceptor', 'blocks.exception', 'blocks.logger', 'blocks.router',
            'ui.router', 'ngplus'
        ]);
})();
