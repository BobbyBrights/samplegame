/**
 * Created by sajid.shaikh on 09-06-2016.
 */

function position(GameUtils) {
  return {
    restrict: 'A',
    replace : false,
    link    : function ($scope, $element, $attrs) {
      GameUtils.position($scope, $element, $attrs);
    }
  };
}
module.exports = /*@ngInject*/ position;