
export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'input-type.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.mass.types.input-type');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.counterBlocks = questionData.noOfBlocks;
  $scope.helpText = questionData.helpText;
  var rotationValue = questionData.rotationValue;

  // Set image path
  $scope.stand = RequireImages.get($scope.getImageContext(), gameData.home.images.stand);
  $scope.balance = RequireImages.get($scope.getImageContext(), gameData.home.images.balance);
  $scope.click = RequireImages.get($scope.getImageContext(), gameData.home.images.click);
  $scope.bugs = RequireImages.get($scope.getImageContext(), questionData.bugs);
  $scope.weights = RequireImages.get($scope.getImageContext(), questionData.weights.box0);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next = next;
  $scope.reset = reset;
  $scope.check = check;
  $scope.redo = redo;
  $scope.getScoreboard = getScoreboard;

  var counter = 0;
  var balanceContainer;
  var rightPan;
  var leftPan;
  var checkButton;
  var maxBlocks;
  var blockCounter=0;
  var blockClickCounter = 0;

  $timeout(function () {
    $('input').on('keydown', function (event) {
      var regex = new RegExp('^[]+$');
      var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    });
  });

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  init();

  // Game initialization function
  function init() {
    $scope.image = [];
    $scope.image.push(counter);
    counter = ++counter > ($scope.counterBlocks.length - 1) ? 0 : counter;
    $scope.rightPanblocks = [];
    blockClickCounter = 0;
    $scope.inputValue = '';
    $scope.flag = -1;
    imageRotation();
  }
  function imageRotation(){
    $timeout(function () {
      balanceContainer = angular.element('.balance-container');
      rightPan = angular.element('.right-pan');
      leftPan = angular.element('.default-rotation-bar-value');
      checkButton = angular.element('.check-btns');
    });
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    blockCounter++;
    if(blockCounter==10){
      blockCounter=0;
    }
    rotateBy(balanceContainer, 0);
    rotateBy(rightPan, 0);
    rotateBy(leftPan, 0);
    $scope.flag = -1;
    checkButton.removeClass('move-disable');
    return false;
  }

  function rotateBy(elem, angle) {
    var ox;
    var oy;
    var rotate = 'rotate(' + angle + 'deg)';
    if (elem === balanceContainer) {
      ox = '50%';
      oy = '50%';
    } else {
      ox = 'top ';
      oy = 'center';
    }
    elem.css({
      '-moz-transform': rotate,
      '-webkit-transform': rotate,
      '-o-transform': rotate,
      '-ms-transform': rotate,
      'transform-origin': ox + oy
    });
  }

  $scope.onClickBlock = function () {
    maxBlocks = $scope.counterBlocks[blockCounter];
    var angle = rotationValue / maxBlocks;
    if (blockClickCounter < maxBlocks) {
      blockClickCounter++;
      $scope.rightPanblocks.push(blockClickCounter);
      rotateBy(balanceContainer, angle * blockClickCounter);
      rotateBy(rightPan, (angle * -blockClickCounter));
      rotateBy(leftPan, (angle * -blockClickCounter));
    }
  };

  $scope.onNumberClick = function ($event, num) {
    if(num === 'backspace'){
      $scope.inputValue=''
    }else{
      $scope.inputValue = num;
    }
  };

  // For reset button click
  function reset($event) {
    $event.preventDefault();
    blockClickCounter = 0;
    $scope.rightPanblocks = [];
    rotateBy(balanceContainer, 0);
    rotateBy(rightPan, 0);
    rotateBy(leftPan, 0);
    $scope.inputValue = '';
    $scope.flag = -1;
    checkButton.removeClass('move-disable');
    return false;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    if ($scope.flag === -1) {
      if (($scope.inputValue > 0) && blockClickCounter > 0) {
        if (($scope.inputValue == blockClickCounter) && (blockClickCounter == maxBlocks)) {
          $scope.flag = 1;
          $scope.scoreboard.upBy();
          checkButton.addClass('move-disable');
        } else {
          $scope.flag = 0;
        }
      }
    }
    return false;
  }

  function redo($event) {
    $event.preventDefault();
    $scope.inputValue = '';
    $scope.flag = -1;
    checkButton.removeClass('move-disable').addClass('move-enable');
    return false;
  }
}