/**
 * Created by Kiran on 29-12-2016.
 */
require('./index.scss');

import template from './index.html';

var infoComponent = {
  bindings: {
    help: '<'
  },
  controller: infoController
};

function infoController($scope, $compile) {
  'ngInject';

  this.$postLink = function () {
    // removing the previous info panel container
    $('.info-panel').remove();
    $scope.help = this.help;
    var infoPanel = '<div class="info-panel ' + this.help.gameName +'">' + template + '</div>';
    var infoElement = $compile(infoPanel)($scope);
    $('body').append(infoElement);
  };

  this.$onDestroy = function () {
    angular.element('.info-panel').remove();
  };

  // removing the current info panel container
  $scope.close = function () {
    angular.element('.info-panel').remove();
  };
}

export default infoComponent;