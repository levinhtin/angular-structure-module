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

        var serverConfigs = {
            vnlocal: {
              host: 'http://vnlocal.youlook.net/',
              hostApi: 'http://api.team.youlook.net:7755/',
                hostImg:'http://vn.team.youlook.net/upload/gallery/'
            },
            local: {
                host: 'http://local.youlook.net/'
            },
            vnteam: {
                host: 'http://vn.team.youlook.net/',
                hostApi: 'http://api.team.youlook.net:7755/',
                hostImg:'http://vn.team.youlook.net/upload/gallery/'
            },
            team: {
                host: 'http://team.youlook.net/',
                hostApi: 'http://api.team.youlook.net:7755/'
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
                host: 'http://youlook.net/',
                hostApi: 'http://api.youlook.net/',
                hostImg: 'http://api.youlook.net/upload/gallery/'
            }

        };

        var externalAuthConfigs = {
          GOOGLE:{
            KEY: "AIzaSyCfdAFl-r33FFCUvSywNDTpixlYeIdiCB4",
            ID:"970331158213-ut90m2sp7rf7nfn39por348u5cfev4hg.apps.googleusercontent.com",
            init:function(){
              switch(location.host){
                case "youlook-frontend.toancauxanh.vn:8084":
                  YouLookServer.GOOGLE.ID = "970331158213-nq10fjs3uf38o59m21oq6vl9ssmui0qh.apps.googleusercontent.com";
                  YouLookServer.GOOGLE.KEY = "AIzaSyCfdAFl-r33FFCUvSywNDTpixlYeIdiCB4";
                break;
                case "dev.youlook.net:8080":
                  YouLookServer.GOOGLE.ID = "970331158213-i49of9rkk1fq4m1ukp91tpdv8vubgg64.apps.googleusercontent.com";
                  YouLookServer.GOOGLE.KEY = "AIzaSyCfdAFl-r33FFCUvSywNDTpixlYeIdiCB4";
                break;
                case "beta.youlook.net":
                  YouLookServer.GOOGLE.ID = "970331158213-ut90m2sp7rf7nfn39por348u5cfev4hg.apps.googleusercontent.com";
                  YouLookServer.GOOGLE.KEY = "AIzaSyCfdAFl-r33FFCUvSywNDTpixlYeIdiCB4";
                break;
                default:
                  YouLookServer.GOOGLE.ID = "970331158213-ut90m2sp7rf7nfn39por348u5cfev4hg.apps.googleusercontent.com";
                  YouLookServer.GOOGLE.KEY = "AIzaSyCfdAFl-r33FFCUvSywNDTpixlYeIdiCB4";
                break;
              }
            }
          },
          FB:{
            ID:"794107900628243",
            FANPAGEID:"513602775389664",
            init:function(){
              switch(location.host){
                case "youlook-frontend.toancauxanh.vn:8084":
                  YouLookServer.FB.ID = "794107900628243";
                break;
                case "dev.youlook.net:8080":
                  YouLookServer.FB.ID = "710379462349221";
                break;
                case "beta.youlook.net":
                  YouLookServer.FB.ID = "546425158746627";
                break;
                case "ulook.us":
                  YouLookServer.FB.ID = "506975602785706";
                break;
                default:
                  YouLookServer.FB.ID = "546425158746627";
                break;
              }
            }
          }
        };

        this.configure = function(cfg) {
            angular.extend(config, cfg);
        };

        this.$get = DetectConfigHelper;
        /* @ngInject */
        DetectConfigHelper.$inject = ['logger'];
        function DetectConfigHelper(logger) {
 
            var service = {
                current: current,
                externalAuth: externalAuthConfigs
            };

            return service;

            ///////////////
            function current(){
                switch(wHost){
                    case 'vnlocal.youlook.net': 
                        return serverConfigs.vnlocal;
                    break;
                    case 'local.youlook.net':
                        return serverConfigs.local;
                    break;
                    case 'vn.team.youlook.net':
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
        }
    }
})();
