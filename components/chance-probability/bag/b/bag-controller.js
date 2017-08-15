export default function bagController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'bag.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.chance-probability.types.bag');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.signs = RequireImages.get($scope.getImageContext(), questionData.signs);

  var images = RequireImages.get($scope.getImageContext(), questionData.images),
    beetles = questionData.beetles,
    beetlesBag = questionData.beetlesBag,
    counter = 0,
    count = 0,
    correct,
    names = questionData.names,
    answer = questionData.answers;

  $scope.labels = questionData.labels;
  $scope.buttonText = questionData.buttonText;
  $scope.buttonLeft = questionData.buttonLeft;
  $scope.buttonTop = questionData.buttonTop;

  //For more/next button click
  $scope.next = next;
  $scope.answerCheck = answerCheck;

  init();

  // Game initialization function
  function init() {
    $scope.beetlesBag = images[beetlesBag[counter]];
    $scope.beetle = images[beetles[counter]];
    $scope.names = names[counter];
    $scope.answerValue = '';
    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('.drag-btn').removeClass('move-disable').addClass('move-enable');
    correct = answer[counter];
    counter++;

    if (counter === 10) {
      counter = 0;
    }
    if (count === 10) {
      $scope.scoreboard.reset();
      count = 0;
    }
  }

  function answerCheck(value) {
    $scope.answerValue = value;
    if (value === correct) {
      count++;
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      angular.element('.drag-btn').removeClass('move-enable').addClass('move-disable');
      $scope.scoreboard.upBy();

    } else {
      $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    }
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }
}
