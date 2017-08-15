/**
 * Created by lenin on 26/12/2016.
 */

import bowser from 'bowser';

export default function browserDirective() {
  'ngInject';

  return {
    restrict: 'A',
    replace : false,
    link    : function ($scope, $element) {
      var getBrowserClasses = function () {
        var brType          = '';
        var device          = '';
        var renderingEngine = '';

        if (bowser.chrome) {
          brType = 'chrome';
        } else if (bowser.msie || bowser.msedge) {
          brType = 'ie';
        } else if (bowser.firefox) {
          brType = 'firefox';
        } else if (bowser.safari) {
          brType = 'safari';
        }

        if (bowser.mobile) {
          device = 'mobile';
        } else if (bowser.tablet) {
          device = 'tablet';
        }

        if (bowser.webkit) {
          renderingEngine = 'engine-webkit';
        } else if (bowser.blink) {
          renderingEngine = 'engine-blink';
        } else if (bowser.gecko) {
          renderingEngine = 'engine-gecko';
        } else if (bowser.msie) {
          renderingEngine = 'engine-msie';
        } else if (bowser.msedge) {
          renderingEngine = 'engine-msedge';
        }

        return brType + ' ' + device + ' ' + renderingEngine;
      };

      $($element).addClass(getBrowserClasses());
    }
  };
}
