require('./index.scss');

import template from './index.html';

export default {
    bindings  : {
      param: '<'
    },
    template  : template,
    controller: checkController
};
function checkController($scope, $element,svgObject) {
  'ngInject';

  $scope.svgFlag = false;
  var assets = require('./images/check-button.xml');
  svgObject.initSVG(assets).then(function () {
    $scope.svgFlag = true;
  });

  $scope.param = -1;
  var vm = this;
  vm.$onChanges = function(){
    $scope.param = vm.param;    
  };
}