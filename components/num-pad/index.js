require('./index.scss');

import _ from 'lodash';
import numPadTemplate from './index.html';

export default {
  bindings  : {
    menu      : '<',
    buttons      : '<',
    onnumberclick: '<'
  },
  template  : numPadTemplate,
  controller: numPadController
};


function numPadController($scope) {
  'ngInject';

  var buttons = this.buttons;
  var noOfButtons,
    numRows = _.range(0,2),
    numColumns = _.range(0,6),
    alphaRows = _.range(0,3),
    alphaColumns = _.range(0,10);
  $scope.padType       = this.menu && this.menu.numPad && this.menu.numPad.padType;
  $scope.padInput       = 'numeric';

  var startNumber = buttons.hasOwnProperty('startNumber') ? buttons.startNumber : 0;
  if(!$scope.padType){
    $scope.padType = 'gray-button-pad';
    $scope.rows = numRows;
    $scope.columns = numColumns;
    noOfButtons = 12;
  }else{
    noOfButtons = buttons.hasOwnProperty('noOfButtons') ? buttons.noOfButtons : 0;
  }

  $scope.buttons       = formatButtonData(noOfButtons, startNumber);
  $scope.onNumberClick = this.onnumberclick;
  $scope.onToggleInput = onToggleInput;

  this.$onChanges = function () {
    startNumber    = this.buttons.hasOwnProperty('startNumber') ? this.buttons.startNumber : 0;
    $scope.buttons = formatButtonData(this.buttons.noOfButtons, startNumber);
  };

  // Format buttons
  function formatButtonData(buttons, startNumber) {
    var btns = {};

    if (_.isNumber(buttons)) {  // buttons = 5
      var endNumber = parseInt(buttons) + parseInt(startNumber);
      for (var i = startNumber; i < endNumber; i++) {
        btns['btn-' + i] = {
          label: i,
          value: i
        };
      }
    } else if (_.isArray(buttons)) { // buttons = [1,2,3,4,5]
      if (_.isNumber(buttons[0])) {
        for (var j = 0; j < buttons.length; j++) {
          btns['btn-' + j] = {
            label: buttons[j],
            value: buttons[j]
          };
        }
      }
    }

    return btns;
  }
  $scope.alphabets = _.range('a'.charCodeAt(0), 'z'.charCodeAt(0) + 1).map(i => String.fromCharCode(i));

  function onToggleInput($event, inputType) {
    $scope.padInput       = inputType;
    $scope.rows = (inputType == 'numeric') ? numRows : alphaRows;
    $scope.columns = (inputType == 'numeric') ? numColumns : alphaColumns;
  }
}
