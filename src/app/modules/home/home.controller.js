(function () {
    'use strict';

    angular
        .module('app.module.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$q', 'logger', 'dataservice', 'socketService'];
    /* @ngInject */
    function HomeController($q, logger, dataservice, socketService) {
        
        var vm = this;
        vm.messages = [];
        vm.message = '';
        socketService.on('init', function (data) {
          vm.name = data.name;
          vm.users = data.users;
        });

        socketService.on('send:message', function (message) {
          vm.messages.push(message);
        });

        socketService.on('change:name', function (data) {
          changeName(data.oldName, data.newName);
        });

        socketService.on('user:join', function (data) {
          vm.messages.push({
            user: 'chatroom',
            text: 'User ' + data.name + ' has joined.'
          });
          vm.users.push(data.name);
        });

        socketService.on('user:left', function (data) {
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

        // Private helpers
        // ===============
        var changeName = function (oldName, newName) {
          // rename user in list of users
          var i;
          for (i = 0; i < vm.users.length; i++) {
            if (vm.users[i] === oldName) {
              vm.users[i] = newName;
            }
          }

          vm.messages.push({
            user: 'chatroom',
            text: 'User ' + oldName + ' is now known as ' + newName + '.'
          });
        }

        // Methods published to the scope
        // ==============================

        vm.changeName = function () {
          socketService.emit('change:name', {
            name: vm.newName
          }, function (result) {
            if (!result) {
              alert('There was an error changing your name');
            } else {

              changeName(vm.name, vm.newName);

              vm.name = vm.newName;
              vm.newName = '';
            }
          });
        };

        vm.sendMessage = function () {
          socketService.emit('send:message', {
            message: vm.message
          });

          // add the message to our model locally
          vm.messages.push({
            user: vm.name,
            text: vm.message
          });

          // clear message box
          vm.message = '';
        };
        //------------------------------------------

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
