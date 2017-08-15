function counterController($scope, $gameData, $state, $stateParams) {
  //counter game functionality............................................
  $scope.index            = 0;
  $scope.showHideTable    = function () {
    if ($('#bigTable').css('visibility') == 'hidden') {
      $('#bigTable').css('visibility', 'visible');
      $scope.index = 0;
    } else {
      $('#bigTable').css('visibility', 'hidden');
      $scope.index = 1;
    }
  };
  $scope.getCounterNumber = function (num1, num2) {
    var int = parseInt(num1.toString() + num2.toString());
    return (int < $scope.randomAnswerNumber);
  };
  counterDisplay();
  function counterDisplay() {
    $scope.headerContent  = $scope.gameData.loadAssetButtons['counters'].headerContent;
    $scope.footerContent  = '';
    $scope.counters       = _.range(0, 10);
    $scope.randomCounters = _.range(0, $scope.randomNumber());
    $scope.itemWidth      = '40px';
  }

  $scope.checkClick = function (getNum) {
    $scope.checkClass = {tick: 'vHidden', cross: 'vVisible'};
    $scope.score      = 0;
    if (parseInt(getNum) == $scope.randomAnswerNumber) {
      $scope.checkClass = {tick: 'vVisible', cross: 'vHidden'};
    }
  };

  $scope.moreClick = function () {
    $scope.checkClass = {tick: 'vHidden', cross: 'vHidden'};
    counterDisplay();
  };
}
module.exports = /*@ngInject*/ counterController;