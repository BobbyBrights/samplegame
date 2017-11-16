/**
 * Created by VishalKhairnar on 3/3/2016.
 */
function svgObject($compile, $q, $http) {
  'ngInject';
  var svgTag,
    svgMain,
    svgObject,
    isGame,
    $scope;
  return {
    initSVG: function (asset) {
      var deferred = $q.defer();
      $http.get(asset)
        .success(function (xml) {
          svgMain        = $($.parseXML(xml).documentElement.outerHTML);
          var attributes = svgMain[0].attributes;

          svgTag = '<svg ';
          for (var i = 0; i < attributes.length; i++) {
            svgTag += attributes[i].nodeName + '="' + attributes[i].value + '" ';
          }
          svgTag += '></svg>';
          var svg = {svgTag: svgTag, svgMain: svgMain};
          deferred.resolve(svg);
        })
        .error(function (data, status) {
          console.error('svgObject > initSVG >> error >>>', status);
          deferred.reject(status);
        });

      return deferred.promise;
    },
    getSVG : function (nodeID, isSVG,$svg) {
      var node;
      if (isSVG) {
        node = isSVG.find('[id=' + nodeID + ']');
      } else {
        if($svg){
          node = $($svg.svgMain).find('[id=' + nodeID + ']').clone();
        }else {
          node = svgMain.find('[id=' + nodeID + ']').clone();
        }
      }
      if(nodeID.indexOf('orange') > -1){
        console.log('getSVG', nodeID, node);
      }

      return node;
    },
    setSVG : function (scope, nodeID, _isGame, container, $attrs, $svg) {
      $scope    = scope;
      isGame    = _isGame;
      svgTag    = _isGame ? $scope.svg.svgTag : svgTag;
      // console.log('svgObj',  nodeID)
      var group;
      if($svg){
        group = this.getSVG(nodeID, isGame,$svg);
      }else {
        group = this.getSVG(nodeID, isGame);
      }
      svgObject = $compile(svgTag)($scope);
      if (!_.isUndefined(container)) {
        var width, height;
        var size = $attrs.svgSize;
        if (size) {
          var values = size.split(/\s*,\s*/);
          width      = values[0];
          height     = values[1];
        } else {
          width = parseInt(container.css('width'), 10);
          height = parseInt(container.css('height'), 10);
        }
        svgObject[0].setAttribute('viewBox', '0 0 ' + width + ' ' + height);
        svgObject[0].removeAttribute('width');
        svgObject[0].removeAttribute('height');
      }
      svgObject.append(group);
      return svgObject;
    }
  };
}
module.exports = /*@ngInject*/ svgObject;