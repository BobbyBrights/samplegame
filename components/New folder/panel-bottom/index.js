/**
 * Created by Kiran on 23-12-2016.
 */

require('./index.scss');

import template from './index.html';


var bottomPanelComponent = {
  bindings  : {
    menu : '<',
    plus : '<',
    minus: '<',
    onnumberclick : '<'
  },
  template  : template,
  controller: panelController
};

function panelController($scope) {
  'ngInject';
  $scope.menu = this.menu;
}

export default bottomPanelComponent;
