export default function halvesController($scope, $state, $stateParams, GameData, $svg, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'halves.b';

  var gameData     = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
        $stateParams.category + '.games.fractions.types.halves'),

      questionData = gameData.home.question;
  $scope.header    = gameData.home.header;

  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.menu.right.icon   = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);

  $scope.nextButterfly = RequireImages.get($scope.getImageContext(), questionData.image.nextButterfly);
  $scope.oneHalf       = RequireImages.get($scope.getImageContext(), questionData.image.oneHalf);
  $scope.sign          = RequireImages.get($scope.getImageContext(), questionData.image.sign);
  $scope.icons         = RequireImages.get($scope.getImageContext(), questionData.icon);

  var subGameTwo   = RequireImages.get($scope.getImageContext(), questionData.image.secondGame),
      subGameThree = RequireImages.get($scope.getImageContext(), questionData.image.thirdGame),
      scoreCount   = 0;


  //For more/next button click
  $scope.next           = next;
  $scope.moreClick      = moreClick;
  $scope.validateAnswer = validateAnswer;
  $scope.getScoreboard  = getScoreboard;

  $scope.counter      = 0;
  $scope.questionText = questionData.hint;
  $scope.subTitle     = questionData.subTitle.text;

  var nextImage = 0;

  if ($scope.counter === 0) {
    butterfly();
  }

  // Game initialization function
  function init() {
    scoreCount = 0;
    $scope.scoreboard.reset();
    angular.element('#tick,#cross').addClass('invisible');
    $scope.counter++;
    nextImage = 0;
    if ($scope.counter === 3) {
      $scope.counter = 0;
      butterfly();
    }
    if ($scope.counter === 1) {
      updateView(nextImage);
    }

    if ($scope.counter === 2) {
      updateViewOne(nextImage);
    }
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  //halves first game
  function butterfly() {
    var targetElement;
    $timeout(function () {
      angular.element('#butterfly').bind('click', function ($event) {
        var parentElement = angular.element(angular.element($event.target).parent()).parent().attr('id'),
            element       = angular.element($event.target).parent();
        if (angular.element(targetElement).parent().attr('id') === parentElement) {
          angular.element('#' + parentElement + '-black').toggleClass('invisible');
        } else {
          angular.element('#' + parentElement + '-black').toggleClass('invisible');
        }
        targetElement = element;
      });
    });
  }

  // halves second game
  function updateView() {
    angular.element('#tick,#cross').addClass('invisible');
    var halveSecondSubtype = questionData.halveSecondSubtype[nextImage];
    $scope.leftImage       = subGameTwo[halveSecondSubtype[0]];
    $scope.rightImage      = subGameTwo[halveSecondSubtype[1]];
  }

  function moreClick() {
    scoreCount = 0;
    nextImage++;
    if (nextImage === 13 && $scope.counter === 1) {
      nextImage = 0;
    }
    if ($scope.counter === 1) {
      updateView(nextImage);
    }
    if (nextImage === 15 && $scope.counter === 2) {
      nextImage = 0;
    }
    if ($scope.counter === 2) {
      updateViewOne(nextImage);
    }
  }

  // halves third game
  function updateViewOne(nextImage) {
    angular.element('#tick,#cross').addClass('invisible');
    var halveThirdSubtype = questionData.halveThirdSubtype[nextImage];
    $scope.leftImage      = subGameThree[halveThirdSubtype[0]];
    $scope.rightImage     = subGameThree[halveThirdSubtype[1]];
  }

  function validateAnswer(value) {
    angular.element('#tick,#cross').addClass('invisible');
    var answerValues = questionData.answers[$scope.counter],
        answers      = answerValues[nextImage];

    if (answers === value) {
      scoreCount++;
      if (scoreCount == 1) {
        $scope.scoreboard.upBy();
      }
      angular.element('#tick').removeClass('invisible').addClass('visible');
    }
    else {
      angular.element('#cross').removeClass('invisible').addClass('visible');
    }
  }

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }
}
