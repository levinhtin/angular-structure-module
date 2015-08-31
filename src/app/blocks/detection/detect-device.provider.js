(function () {
'use strict';

/**
 * @ngdoc overview
 * @name adaptive.detection
 *
 * @description
 * The main module which holds everything together.
 */
var adaptive = angular.module('blocks.detection');

/**
 * @ngdoc object
 * @name adaptive.detection.$detectionProvider
 *
 * @description
 * The `$detectionProvider` provides an interface to configure `$detection service for
 * runtime.
 */
adaptive.provider('detectDevice', [function() {
  var apple_phone         = /iPhone/i,
      apple_ipod          = /iPod/i,
      apple_tablet        = /iPad/i,
      android_phone       = /(?=.*\bAndroid\b)(?=.*\bMobile\b)/i, // Match 'Android' AND 'Mobile'
      android_tablet      = /Android/i,
      amazon_phone        = /(?=.*\bAndroid\b)(?=.*\bSD4930UR\b)/i,
      amazon_tablet       = /(?=.*\bAndroid\b)(?=.*\b(?:KFOT|KFTT|KFJWI|KFJWA|KFSOWI|KFTHWI|KFTHWA|KFAPWI|KFAPWA|KFARWI|KFASWI|KFSAWI|KFSAWA)\b)/i,
      windows_phone       = /IEMobile/i,
      windows_tablet      = /(?=.*\bWindows\b)(?=.*\bARM\b)/i, // Match 'Windows' AND 'ARM'
      other_blackberry    = /BlackBerry/i,
      other_blackberry_10 = /BB10/i,
      other_opera         = /Opera Mini/i,
      other_chrome        = /(CriOS|Chrome)(?=.*\bMobile\b)/i,
      other_firefox       = /(?=.*\bFirefox\b)(?=.*\bMobile\b)/i, // Match 'Firefox' AND 'Mobile'
      seven_inch = new RegExp(
          '(?:' +         // Non-capturing group

          'Nexus 7' +     // Nexus 7

          '|' +           // OR

          'BNTV250' +     // B&N Nook Tablet 7 inch

          '|' +           // OR

          'Kindle Fire' + // Kindle Fire

          '|' +           // OR

          'Silk' +        // Kindle Fire, Silk Accelerated

          '|' +           // OR

          'GT-P1000' +    // Galaxy Tab 7 inch

          ')',            // End non-capturing group

          'i');           // Case-insensitive matching

  var match = function(regex, userAgent) {
    return regex.test(userAgent);
  };
  var ua = navigator.userAgent;
  // Facebook mobile app's integrated browser adds a bunch of strings that
  // match everything. Strip it out if it exists.
  var tmp = ua.split('[FBAN');
  if (typeof tmp[1] !== 'undefined') {
      ua = tmp[0];
  }

  var isMobile = {
      Android: function() {
          return navigator.userAgent.match(/Android/i);
      },
      BlackBerry: function() {
          return navigator.userAgent.match(/BlackBerry/i);
      },
      iOS: function() {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
      },
      Opera: function() {
          return navigator.userAgent.match(/Opera Mini/i);
      },
      Windows: function() {
          return navigator.userAgent.match(/IEMobile/i);
      },
      any: function() {
          return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
      }
  };
  this.isMobile = isMobile;
  /**
   * @ngdoc function
   * @name adaptive.detection.$detectionProvider#setUserAgent
   * @methodOf adaptive.detection.$detectionProvider
   *
   * @description
   * Let's you configure a custom User Agent string during your apps configuration.
   *
   * <pre>
   * var app = angular.module('myApp', ['adaptive.detection']);
   *
   * app.config(['$detectionProvider', function ($detectionProvider) {
   *   // sets custom User Agent
   *   $detectionProvider.setUserAgent('angular browser');
   * }]);
   * </pre>
   *
   * @param {string} Custom User Agent string
   */
  this.setUserAgent = function(userAgent) {
    this.userAgent = userAgent;
  };
  /**
   * @ngdoc object
   * @name adaptive.detection.$detection
   *
   * @description
   * The `$detection` service can be injected anywhere in your app during runtime like
   * every other service. It provides methods to detect wheter a the current client is
   * for example and iOS device or an Android device.
   *
   * You are also able to retreive the current User Agent using this service.
   */
  
  this.$get = function() {
    var userAgent = this.userAgent;

    return {
      /**
       * @ngdoc function
       * @name adaptive.detection.$detection#getUserAgent
       * @methodOf adaptive.detection.$detection
       *
       * @description
       * Returns the current User Agent which was set with `$detectionProvider.setUserAgent'.
       *
       * @return {string} userAgent
       */
      getUserAgent: function(){
        return userAgent;
      },
      isMobile: function(){
        return isMobile.any();
      },
      /**
       * @ngdoc function
       * @name adaptive.detection.$detection#isiOS
       * @methodOf adaptive.detection.$detection
       *
       * @description
       * Returns true if current device is an iOS device.
       *
       * @return {bool}
       */
      isiOS: function(){
        return (/(iPad|iPhone|iPod)/gi).test(userAgent);
      },
      /**
       * @ngdoc function
       * @name adaptive.detection.$detection#isAndroid
       * @methodOf adaptive.detection.$detection
       *
       * @description
       * Returns true if current device is an Android device.
       *
       * @return {bool}
       */
      isAndroid: function(){
        return (/(Android)/gi).test(userAgent);
      },
      /**
       * @ngdoc function
       * @name adaptive.detection.$detection#isWindowsPhone
       * @methodOf adaptive.detection.$detection
       *
       * @description
       * Returns true if current device is a Windows Phone device.
       *
       * @return {bool}
       */
      isWindowsPhone: function(){
        return (/(IEMobile)/gi).test(userAgent);
      },
      /**
       * @ngdoc function
       * @name adaptive.detection.$detection#isBB10
       * @methodOf adaptive.detection.$detection
       *
       * @description
       * Returns true if current device is a BlackBerry 10 device.
       *
       * @return {bool}
       */
      isBB10: function(){
        return (/(BB10)/gi).test(userAgent);
      }
    };
  };

}]);

})();