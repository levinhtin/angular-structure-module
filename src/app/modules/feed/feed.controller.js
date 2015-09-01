(function () {
  'use strict';

  angular
      .module('app.module.feed')
      .controller('FeedController', FeedController);

  /* @ngInject */
  FeedController.$inject = ['$q', 'feedService', 'logger'];
  function FeedController($q, feedService, logger) {
    /* @Initialize */
    var self = this;
    self.pagination = {
      total: 0,
      pageSize: 10,
      pageIndex: 1
    };

    self.feeds = [];

    /* @Definition */

    /* @Init Action */
    init();

    /* @Implimentation */
    function init(){
      activate();
    }

    function activate() {
        // var promises = [getMessageCount(), getPeople()];
        var promises = [];
        return $q.all(promises).then(function() {
            logger.info('Activated Feeds View');
        });
    }

    function getFeeds(){
      feedService.getFeeds
    }
  }
})();
