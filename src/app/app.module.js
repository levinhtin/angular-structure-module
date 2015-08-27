(function () {
    'use strict';

    angular.module('app', [
    		'oc.lazyLoad',
        'app.core',
        'app.widgets',
        'app.layout',
        'app.module.admin',
        'app.module.feeds',
        'app.module.home'
    ]);

})();