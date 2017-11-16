/**
 * Directive to rotate the element
 *
 * @module : Amitesh
 * @directive : rotateBy
 *
 * @usage
 * <div data-rotateBy="<degree-to-rotate>"></<div>
 *
 * @example
 * <div data-rotateBy="12"></<div>
 */

export default function rotateByDirective() {
  'ngInject';

  return {
    restrict: 'A',
    replace : false,
    link    : function ($scope, $element, $attrs) {
      var rotateBy = $attrs.rotateBy;
      var elem     = $element;

      // Transform the css to rotate based on the new rotate degrees
      if (rotateBy) {
        rotateElem(rotateBy);
      }

      if ($attrs.isWatch) {
        $scope.$watch('rotateBy', function (newValue) {
          if (newValue) {
            rotateElem(newValue);
          }
        }, true);
      }

      function rotateElem(rotateBy) {
        elem.css({
          '-moz-transform'   : 'rotate(' + rotateBy + 'deg)',
          '-webkit-transform': 'rotate(' + rotateBy + 'deg)',
          '-o-transform'     : 'rotate(' + rotateBy + 'deg)',
          '-ms-transform'    : 'rotate(' + rotateBy + 'deg)',
          'transform'        : 'rotate(' + rotateBy + 'deg)'
        });
      }
    }
  };
}

