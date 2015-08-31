/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('blocks.socket')
        .factory('socketService', socketService);

    socketService.$inject = ['$rootScope'];
    /* @ngInject */
    function socketService($rootScope) {
      var socket = io.connect('http://localhost:3000');
      return {
        on: on,
        emit: emit
      };

      function on(eventName, callback) {
        socket.on(eventName, function () {  
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(socket, args);
          });
        });
      }

      function emit(eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args);
            }
          });
        })
      }
    }
})();
