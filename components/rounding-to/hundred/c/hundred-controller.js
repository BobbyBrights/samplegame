export default function hundredController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'hundred.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.rounding-to.types.hundred');

  var questionData = gameData.home.question;
  $scope.header = gameData.home.header;
  $scope.questionText = questionData.topText.text;
  $scope.middleText = questionData.middleText.text;


  // Set image path
  $scope.hundredImages = RequireImages.get($scope.getImageContext(), questionData.hundredImages);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.dropZonesTop = questionData.dropZonesTop;
  var ten = 10;
  var maxRange = 101;


  //For more/next button click
  $scope.next = next;
  $scope.itemDropped      = itemDropped;
  $scope.itemBadlyDropped = itemBadlyDropped;
  $scope.getUniqueId = getUniqueId;


  init();

  function handleRandom() {
    $scope.randomNumber = _.sample(_.range(ten,maxRange));
    var minNumber = Math.floor($scope.randomNumber / ten) * ten;
    var maxNumber = (minNumber + ten) + 1;
    if ($scope.randomNumber == maxRange - 1) {
      maxNumber = minNumber + 1;
      minNumber = maxNumber - ten - 1 ;
    }
    $scope.dropGroup = $scope.randomNumber < Math.floor((maxNumber + minNumber) / 2) ? [1,0] :[0,1];
    $scope.numberRange = _.range(minNumber, maxNumber);
  }

  // Game initialization function
  function init() {
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


}
