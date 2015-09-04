/* Help configure the state-base ui.router */
(function() {
    'use strict';

    angular
        .module('blocks.detection')
        .provider('detectConfigHelper', detectConfigHelper);

    /* @ngInject */
    detectConfigHelper.$inject = [];
    function detectConfigHelper() {
        var wHost = window.location.host;
        wHost = wHost.replace('www.','');

        var configs = {
            vnlocal: {
              host: 'http://vnlocal.youlook.net/',
              hostApi: 'http://youlook-beta.toancauxanh.vn:7755/',
              hostImg: 'http://youlook-beta.toancauxanh.vn:7755/upload/gallery/'
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
                host: 'http://vnbeta.youlook.net/',
                hostApi: 'http://youlook-beta.toancauxanh.vn:7755/',
                hotImg: 'http://youlook-beta.toancauxanh.vn:7755/'
            },
            beta: {
                host: 'http://beta.youlook.net/'
            },
            vnlive: {
                host: 'http://vn.youlook.net/'
            },
            live: {
                host: 'http://youlook.net/'
                hostApi: 'http://api.youlook.net/',
                hostImg: 'http://api.youlook.net/upload/gallery/'
            }

        }
        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = DetectConfigHelper;
        /* @ngInject */
        DetectConfigHelper.$inject = ['logger'];
        function DetectConfigHelper(logger) {
 
            var service = {
                current: current,
            };

            return service;

            ///////////////
            function current(){
                switch(wHost){
                    case 'vnlocal.youlook.net': 
                        return configs.vnlocal;
                    break;
                    case 'local.youlook.net':
                        return configs.local;
                    break;
                    case 'vnteam.youlook.net':
                        return configs.vnteam;
                    break;
                    case 'team.youlook.net':
                        return configs.team;
                    break;
                    case 'vnalpha.youlook.net':
                        return configs.vnalpha;
                    break;
                    case 'alpha.youlook.net':
                        return configs.alpha;
                    break;
                    case 'vnbeta.youlook.net':
                        return configs.vnbeta;
                    break;
                    case 'beta.youlook.net':
                        return configs.beta;
                    break;
                    case 'vn.youlook.net':
                        return configs.vnlive;
                    break;
                    case 'youlook.net':
                        return configs.live;
                    break;
                }
            }
        }
    }
})();
