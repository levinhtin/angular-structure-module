(function() {
  'use strict';
  angular.module('blocks.translate')
  .factory('customTranslateLoader', customTranslateLoader);

  customTranslateLoader.$inject = ['$q', '$http', '$timeout'];

  function customTranslateLoader($q, $http, $timeout) {
    return function (options) {
      if (!options || (!angular.isArray(options.files) && (!angular.isString(options.prefix) || !angular.isString(options.suffix)))) {
        throw new Error('Couldn\'t load static files, no files and prefix or suffix specified!');
      }
      if (!options.files) {
        options.files = [{
          prefix: options.prefix,
          suffix: options.suffix
        }];
      }
      var load = function (file) {
        if (!file || (!angular.isString(file.prefix) || !angular.isString(file.suffix))) {
          throw new Error('Couldn\'t load static file, no prefix or suffix specified!');
        }

        var deferred = $q.defer();
        $http(angular.extend({
          url: [
            file.prefix,
            options.key,
            file.suffix
          ].join(''),
          method: 'GET',
          params: ''
        }, options.$http)).success(function (data) {
          deferred.resolve(data);
        }).error(function () {
          deferred.reject(options.key);
        });
  
        return deferred.promise;
      };
  
      var deferred = $q.defer(),
          promises = [],
          length = options.files.length;
  
      for (var i = 0; i < length; i++) {
        promises.push(load({
          prefix: options.files[i].prefix,
          key: options.key,
          suffix: options.files[i].suffix
        }));
      }
  
      $q.all(promises).then(function (data) {
        var length = data.length,
            mergedData = {};
  
        for (var i = 0; i < length; i++) {
          for (var key in data[i]) {
            mergedData[key] = data[i][key];
          }
        }
        
        deferred.resolve(mergedData);
      }, function (data) {
        deferred.reject(data);
      });
  
      return deferred.promise;
    };
  }
})();