/**
 * Created by Rajesh on 18-11-2016.
 */

require('./index.scss');

import template from './index.html';


var leftPanelComponent = {
  bindings: {
    menu: '<'
  },
  template: template,
  controller: panelController
};

function panelController($scope) {
  'ngInject';

  $scope.menu = this.menu;
}

export default leftPanelComponent;
