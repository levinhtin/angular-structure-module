(function() {
  'use strict';
  
  angular
    .module('app.module.user')
    .service('userService', userService);

    userService.$inject = ['$rootScope', '$q', '$http', '$cookies', '$cookieStore', 'authHelper', 'httpRequest'];

    function userService($rootScope, $q, $http, $cookies, $cookieStore, authHelper, httpRequest){
      return {
        getUserInfo: getUserInfo,
        getCoverPhoto: getCoverPhoto,
        getRelations: getRelations,
        getMutualFriend: getMutualFriend,
        getTotalCredit: getTotalCredit,
        getActivities: getActivities
      }
      function getUserInfo(userId){
        return httpRequest.get('users/' + userId);
      }
      function getCoverPhoto(userId){
        return httpRequest.get('users/' + userId + '/cover_photo');
      }
      function getRelations(userId){
        return httpRequest.get('users/' + userId + '/me_relations');
      }
      function getMutualFriend(userId, page, limit){
        return httpRequest.get('users/' + userId + '/mutual_friends?page=' + page +'&limit=' + limit);
      }
      function getTotalCredit(userId){
        return httpRequest.get('users/' + userId + '/total_credit');
      }
      function getActivities(userId, page, limit){
        return httpRequest.get('users/' + userId + '/activities?page=' + page +'&limit=' + limit);
      }
    }
})();