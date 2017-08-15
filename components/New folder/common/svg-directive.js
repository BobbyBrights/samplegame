/**
 * Created by M044 on 8/1/2016.
 */
function svgDirective(svgObject, $compile) {
  return {
    restrict  : 'AE',
    replace   : true,
    scope     : {
      click: '&',
      gameSvg: '='
    },
    transclude: true,
    template  : '<div ng-transclude></div>',
    link      : function ($scope, $element, $attrs) {
      var nodeName = $attrs.nodename;
      var svgTag;
      if($scope.gameSvg){
        svgTag   = svgObject.setSVG($scope, nodeName, false, $element, $attrs,$scope.gameSvg);
      }else {
        svgTag   = svgObject.setSVG($scope, nodeName, false, $element, $attrs);
      }
      console.log('svgTag', svgTag, nodeName, $scope.cubes);
      $element.append(svgTag);
      if ($attrs.buttons) {
        var buttonName         = $attrs.buttons;
        var button             = 'clicked' + buttonName;
        $scope.button          = svgObject.getSVG(buttonName, $element);
        $scope.$parent[button] = $scope.button;
        $scope.button.attr('ng-click', 'click()');
        $compile($scope.button)($scope);
      }
    }
  };
}
module.exports = /*@ngInject*/ svgDirective;