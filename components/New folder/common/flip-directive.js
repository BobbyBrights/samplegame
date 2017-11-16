/**
 * Directive to flip the element
 *
 * @module : Amitesh
 * @directive : flipBy
 *
 * @usage
 * <div data-flipBy="-1|1"></<div>
 *
 * @example
 * <div data-flipBy="-1"></<div>
 */

export default function flipByDirective() {
  'ngInject';

  return {
    restrict: 'A',
    replace : false,
    link    : function ($scope, $element, $attrs) {
      var flipBy = $attrs.flipBy;
      var elem   = $element;

      // Transform the css to flip the element
      if (flipBy !== '') {
        flipElem(flipBy);
      }

      if ($attrs.isWatch) {
        $scope.$watch('flipBy', function (newValue) {
          if (newValue) {
            flipElem(newValue);
          }
        }, true);
      }

      function flipElem(flipBy) {
        elem.css({
          '-moz-transform'   : 'scaleX(' + flipBy + ')',
          '-webkit-transform': 'scaleX(' + flipBy + ')',
          '-o-transform'     : 'scaleX(' + flipBy + ')',
          '-ms-transform'    : 'scaleX(' + flipBy + ')',
          'transform'        : 'scaleX(' + flipBy + ')'
        });
      }
    }
  };
}

