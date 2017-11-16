/* global MOBILE, UIBUTTON_CLICK */

function utils() {
  'ngInject';
  return {
    // Common used position attributes used in uiElement directive.
    position             : function ($scope, $element, $attrs) {
      if ($attrs.position !== undefined) {
        var attrDict = [];
        var values   = $attrs.position.split(/\s*,\s*/);

        if (values.length === 2) {
          attrDict.x = values[0];
          attrDict.y = values[1];
          $element.css('position', 'absolute');
          $element.css('left', attrDict.x + '%');
          $element.css('top', attrDict.y + '%');
        } else {
          console.error('utils.position() - invalid number of values for position.');
        }
      }
    },
    // Common used size attributes used in uiElement directive.
    size                 : function ($scope, $element, $attrs) {
      if ($attrs.size !== undefined) {
        var attrDict = [];
        var values   = $attrs.size.split(/\s*,\s*/);

        if (values.length === 2) {
          attrDict.width  = values[0];
          attrDict.height = values[1];
          $element.css('position', 'absolute');
          $element.css('width', attrDict.width + '%');
          $element.css('height', attrDict.height + '%');
        } else {
          console.error('utils.size() - invalid number of values for size.');
        }
      }
    },
    /* Event added for uiElement directive.
     * Get and handle event them according to makeMouseEventHandler function. */
    addEventListeners    : function ($scope, $element, $attrs, interactionDelayTimer, interactionDelay) {
      if (!$attrs.clicklock) {
        var start = MOBILE ? 'touchend' : 'click';
        $element.on(start, function (e) {
          $scope.$emit(UIBUTTON_CLICK, $attrs);
          e.preventDefault();
          e.stopPropagation();
          clearTimeout(interactionDelayTimer);
        });
      }

      if (!MOBILE && $attrs.srcHover) { // jshint ignore:line
        var end = 'mouseleave';
        $element.on(end, function () {
          $($element.children()[1]).css({display: 'none'});
          clearTimeout(interactionDelayTimer);

        });
        $element.on('mouseover', function () {
          // Prevent asynchronous issues with fast mouse over events
          clearTimeout(interactionDelayTimer);
          interactionDelayTimer = setTimeout(function () {
            $($element.children()[1]).css({display: 'block'});
          }, interactionDelay);
        });
      }
    },
    addMouseEventHandlers: function ($scope, $element, $attrs) {
      var EVENTS = ['mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'mousemove'];
      if (!$attrs.clicklock) {
        EVENTS = EVENTS.concat(['mousedown', 'mouseup', 'click', 'dblclick', 'contextmenu']);
      }
      for (var i = 0; i < EVENTS.length; i++) {
        var eventName = EVENTS[i];
        if (angular.isDefined($attrs[eventName])) {
          var handlerName = $attrs[eventName];

          if (handlerName === '') {
            handlerName = eventName;
          }
          var handler = makeMouseEventHandler(eventName, handlerName);
          $element[0].addEventListener(eventName, handler);
        }
      }
      function makeMouseEventHandler(eventName, handlerName) {
        var scope      = $scope.$parent;
        var callback   = scope[handlerName];
        var attributes = $.extend({}, $attrs);

        if (angular.isDefined(callback)) {
          if (typeof callback === 'function') {
            return function (event) {
              callback(event, scope, $element, attributes);
            };
          }
        }
      }
    }

  };
}
module.exports = /*@ngInject*/ utils;