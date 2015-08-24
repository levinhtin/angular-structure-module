(function() {
    'use strict';

    angular
        .module('app.widgets')
        .directive('youlookChatbox', youlookChatbox);

    /* @ngInject */
    function youlookChatbox() {
        //Usage:
        //<div ht-widget-header title="vm.map.title"></div>
        // Creates:
        // <div ht-widget-header=""
        //      title="Movie"
        //      allow-collapse="true" </div>
        var directive = {
            scope: {
                'message': '@',
            },
            templateUrl: 'src/app/widgets/widget-chatbox.html',
            restrict: 'EA',
            link: link
        };
        return directive;
        function link(scope, element, attrs) {
            elem.on('submit', function() {
                var mess = scope.message;
                console.log(mess);
                scope.$broadcast('form:submit');
            });
        };
    }
})();