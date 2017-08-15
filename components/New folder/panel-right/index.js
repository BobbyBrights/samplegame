/**
 * Created by Rajesh on 18-11-2016.
 */

require('./index.scss');

import template from './index.html';


var rightPanelComponent = {
  bindings  : {
    menu         : '<',
    next         : '<',
    getscoreboard: '<'
  },
  template  : template,
  controller: panelController
};

function panelController($scope) {
  'ngInject';

  $scope.menu = this.menu || {};
  $scope.next = this.next;

  $scope.panalDisplay = this.menu ? true : false;

  $scope.onAbout = onAbout;
  $scope.onHowTo = onHowTo;


  function onAbout($event) {
    $event && $event.preventDefault(); // jshint ignore:line
    alert('In WIP...');
  }

  function onHowTo($event) {
    $event && $event.preventDefault(); // jshint ignore:line
    alert('In WIP...');
  }
}

export default rightPanelComponent;
