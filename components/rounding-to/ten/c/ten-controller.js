
export default function tenController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'ten.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.rounding-to.types.ten');

  var questionData = gameData.home.question;
  $scope.header = gameData.home.header;
  $scope.topQuestionText = questionData.topText.text;
  $scope.middleText = questionData.middleText.text;

  // Set image path
  $scope.tenImages = RequireImages.get($scope.getImageContext(), questionData.tenImages);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.dropZonesTop = questionData.dropZonesTop;
  var ten =1;
  var maxRange = 11;
  var minNumber = 0;
  var maxNumber = 10;

  //For more/next button click
  $scope.next = next;
  $scope.itemDropped      = itemDropped;
  $scope.itemBadlyDropped = itemBadlyDropped;
  $scope.getUniqueId = getUniqueId;


  init();

  function handleRandom() {
    $scope.randomNumber = _.sample(_.range(ten,maxRange));
    $scope.dropGroup = $scope.randomNumber < 5 ?[1,0] :[0,1];
    $scope.numberRange = _.range(minNumber, maxNumber + 1);
    console.log('$scope.numberRange',$scope.numberRange[0]);
  }

  // Game initialization function
  function init(){
    angular.element('#drag-circle').css({left: '48%', top: ' 42.8%'});
    handleRandom();
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    angular.element('#drag-circle').css({'pointer-events': 'auto'});
    init();

    return false;
  }

  function itemDropped(dragItem, dropZone) {
    dragItem.dropOnto(dropZone);
    dragItem.css({'pointer-events': 'none'});
  }

  function itemBadlyDropped(dragItem) {
    dragItem.goHome();
  }

  function getUniqueId() {
    return new Date().getTime() + '-' + Math.random() * (100000 - 1) + 1;
  }

  /* Game specific logic and common function for all sub types could be added here */

}
