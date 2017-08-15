
export default function blockController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'block.a';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.more-count.types.block');

  var questionData = gameData.home.question,
    correctAnswer;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set image path
  $scope.randomBlockImages = RequireImages.get($scope.getImageContext(), questionData.randomBlocks);
  $scope.sign = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.images = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.checkClass = {tick: 'invisible', cross: 'invisible'};

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For next button click
  $scope.next = next;

  //Function to check visibility of tick
  $scope.checkClick = checkClick;

  init();

  // Game initialization function
  function init() {
    $scope.buttons = _.range(0, 11);
    $scope.randomBlocks = _.range(0, $scope.randomNumber());
    correctAnswer = $scope.randomBlocks.length;
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('.action-btn').css({'pointer-events': 'auto'});
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function checkClick($event, getNum) {
    if (parseInt(getNum) === correctAnswer) {
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      angular.element('.action-btn').css({'pointer-events': 'none'});
    } else {
      $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    }
  }
}
