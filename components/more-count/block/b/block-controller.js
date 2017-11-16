function blockController($scope, $gameData, $state, $stateParams) {
  //blocks game functionality...............................................
  blockDisplay();
  var correctAnswer;

  function blockDisplay() {
    $scope.headerContent = $scope.gameData.loadAssetButtons['blocks'].headerContent;
    $scope.footerContent = '';
    $scope.blocks        = _.range(0, 10);
    $scope.randomBlocks  = _.range(0, $scope.randomNumber());
    correctAnswer        = $scope.randomBlocks.length
    $scope.itemWidth     = '400px';
  };

  $scope.checkClass = {tick: 'vHidden', cross: 'vHidden'};
  $scope.checkClick = function (getNum) {
    $scope.checkClass = {tick: 'vHidden', cross: 'vVisible'};
    $scope.score      = 0;
    if (parseInt(getNum) == correctAnswer + 10) {
      $scope.checkClass = {tick: 'vVisible', cross: 'vHidden'};
    }
  };

  $scope.moreClick = function () {
    $scope.checkClass = {tick: 'vHidden', cross: 'vHidden'};
    blockDisplay();
  };
}
module.exports = /*@ngInject*/ blockController;