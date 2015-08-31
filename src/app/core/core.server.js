(function () {
    'use strict';
    var wHost = window.location.host;
        wHost = wHost.replace('www.','');

    var serverConfig = current(wHost)
    var core = angular.module('app.core');
    core.constant('serverConfig', serverConfig);

    
    function current(wHost){
    	var serverConfigs = {
	        vnlocal: {
	            host: 'http://vnlocal.youlook.net/',
	            hostApi: 'http://api.youlook.net/'
	        },
	        local: {
	            host: 'http://local.youlook.net/'
	        },
	        vnteam: {
	            host: 'http://vnteam.youlook.net/'
	        },
	        team: {
	            host: 'http://team.youlook.net/'
	        },
	        vnalpha: {
	            host: 'http://vnalpha.youlook.net/'
	        },
	        alpha: {
	            host: 'http://alpha.youlook.net/'
	        },
	        vnbeta: {
	            host: 'http://vnbeta.youlook.net/'
	        },
	        beta: {
	            host: 'http://beta.youlook.net/'
	        },
	        vnlive: {
	            host: 'http://vn.youlook.net/'
	        },
	        live: {
	            host: 'http://youlook.net/'
	        }

	    }
      switch(wHost){
          case 'vnlocal.youlook.net': 
              return serverConfigs.vnlocal;
          break;
          case 'local.youlook.net':
              return serverConfigs.local;
          break;
          case 'vnteam.youlook.net':
              return serverConfigs.vnteam;
          break;
          case 'team.youlook.net':
              return serverConfigs.team;
          break;
          case 'vnalpha.youlook.net':
              return serverConfigs.vnalpha;
          break;
          case 'alpha.youlook.net':
              return serverConfigs.alpha;
          break;
          case 'vnbeta.youlook.net':
              return serverConfigs.vnbeta;
          break;
          case 'beta.youlook.net':
              return serverConfigs.beta;
          break;
          case 'vn.youlook.net':
              return serverConfigs.vnlive;
          break;
          case 'youlook.net':
              return serverConfigs.live;
          break;
      }
  }
})();