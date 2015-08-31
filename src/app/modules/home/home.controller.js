(function () {
    'use strict';

    angular
        .module('app.module.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'logger', 'dataservice', 'socketService'];
    /* @ngInject */
    function HomeController($q, logger, dataservice, socketService) {
        
        var vm = this;
        socketService.on('init', function (data) {
          vm.name = data.name;
          vm.users = data.users;
        });

        socket.on('send:message', function (message) {
          vm.messages.push(message);
        });

        socket.on('change:name', function (data) {
          changeName(data.oldName, data.newName);
        });

        socket.on('user:join', function (data) {
          vm.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
          });
          vm.users.push(data.name);
        });

        socket.on('user:left', function (data) {
          vm.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has left.'
          });
          var i, user;
          for (i = 0; i < vm.users.length; i++) {
            user = vm.users[i];
            if (user === data.name) {
              vm.users.splice(i, 1);
              break;
            }
          }
        });
        
        vm.news = {
            title: 'helloWorld',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';

        activate();

        function activate() {
            // var promises = [getMessageCount(), getPeople()];
            var promises = [];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        };
    }
})();
