/**
 * Created by sajid.shaikh on 09-06-2016.
 */

function size(GameUtils) {
  return {
    restrict: 'A',
    replace : false,
    link    : function ($scope, $element, $attrs) {
      GameUtils.size($scope, $element, $attrs);
    }
  };
}
module.exports = /*@ngInject*/ size;