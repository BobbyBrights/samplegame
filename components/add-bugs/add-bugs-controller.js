export default function addBugsController($scope, $stateParams, GameData, RequireImages) {
  'ngInject';

  var gameData = GameData.getCurrentGame();

  $scope.category = $stateParams.category;
  $scope.gameName = $stateParams.game || 'add-bugs';


  // Require the images
  var imageContext = require.context('./', true, /.*\.svg$/);

  $scope.getImageContext = function () {
    return imageContext;
  };

  /**
   * Game specific logic
   */
  var number       = 0,
      questionData = gameData.home.question;

  $scope.header      = gameData.home.header;
  $scope.bugsImages  = RequireImages.get(imageContext, questionData.bugsImages);
  $scope.bigBugImage = RequireImages.get(imageContext, questionData.bigBugImage);


  $scope.footer       = gameData.home.footer.text;
  $scope.questionText = questionData.hint.text;
  $scope.menu         = _.cloneDeep(gameData.menu);
  $scope.sign         = RequireImages.get(imageContext, questionData.sign);

  //For number button click
  $scope.checkClick = checkClick;

  //For more/next button click
  $scope.next = next;

  //For rotate
  $scope.transformLeft  = questionData.rotateDegree[0];
  $scope.transformRight = questionData.rotateDegree[1];

  $scope.getScoreboard = getScoreboard;

  init();

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  function init() {
    var maxLimit = 5,
        minLimit = 1;

    var leftBugsPosition  = questionData.leftBugsPosition,
        rightBugsPosition = questionData.rightBugsPosition,
        firstNumber       = $scope.generateRandomNumber(maxLimit, minLimit),
        secondNumber      = $scope.generateRandomNumber(maxLimit, minLimit);

    number = firstNumber + secondNumber;

    var result = [number - 1, number, number + 1];

    $scope.checkClass = {tick: 'invisible', cross: 'invisible'};
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    /* $scope.help =  gameData.help;*/

    $scope.menu.bottom.numPad.noOfButtons = _.shuffle(result);
    $scope.bugsLeftPosition              = _.take(leftBugsPosition, firstNumber);
    $scope.bugsRightPosition             = _.take(rightBugsPosition, secondNumber);

    // Creating new object to forceful call the components $onChanges event
    $scope.menu = _.merge({}, $scope.menu);
  }

  function checkClick($event, getNum) {
    if (parseInt(getNum) === number) {
      $scope.checkClass = {tick: 'visible', cross: 'invisible'};
      angular.element('.action-btn').css({'pointer-events': 'none'});
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
