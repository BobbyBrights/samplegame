/**
 * Directive to get the input values
 *
 * @module : Kiran
 * @directive : text-box
 *
 * @usage
 * <text-box id="input-1" maxlenght="2" tab-index="1"></<text-box>
 *
 * @example
 *  <text-box id="input-1" maxlength="2" tab-index="1"></text-box>
 */

require('./index.scss');

export default function inputDirective() {
  return {
    restrict  : 'E',
    replace   : true,
    scope     : true,
    template  : '<input type="text" class="input-field" ng-click="selectInput($event)"' +
                ' ng-keyup="selectInput($event)"/>',
    link      : function(scope, element, attr) {

      var cursorPosVal = '',
        keyFlag = false;

      // User select the input
      scope.selectInput = function ($event) {
        $(element).siblings('.input-field').removeAttr('selected');
        $(element).attr('selected', 'selected');
        keyFlag = true;
        getCursorPos($event);
      };

      //Listen the input values from particular game's
      scope.$parent.$on('listenInput', function (event, val) {
        if ($(element).attr('selected')) {
          var tempVal = $(element).val();
          if (_.size(tempVal) < parseInt(attr.maxlength)) {
            var inputVal = keyFlag && (cursorPosVal === 0) ? val + '' + tempVal : tempVal + '' + val;
            $(element).val(inputVal);
            keyFlag = false;
          }
        }
      });

      //cursor position
      function getCursorPos($event) {
        var myEl = $event.target;
        doGetCaretPosition(myEl);
      }

      function doGetCaretPosition(oField) {
        // Initialize
        var iCaretPos = 0;

        // IE Support
        if (document.selection) {

          // Set focus on the element
          oField.focus();

          // To get cursor position, get empty selection range
          var oSel = document.selection.createRange();

          // Move selection start to 0 position
          oSel.moveStart('character', -oField.value.length);

          // The caret position is selection length
          iCaretPos = oSel.text.length;
        }

        // Firefox support
        else if (oField.selectionStart || (oField.selectionStart === '0')) {
          iCaretPos = oField.selectionStart;
        }

        // Return results
        cursorPosVal = iCaretPos;
      }
    }
  };
}


