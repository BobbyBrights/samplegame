
export default function frogController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'frog.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.subtraction.types.frog');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.questionSubminus = questionData.minus.text;
  $scope.questionSubequal = questionData.equal.text;
  $scope.flag = true;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.menu.right.icon = RequireImages.get($scope.getImageContext(), gameData.menu.right.icon);
  $scope.numberlineImg = RequireImages.get($scope.getImageContext(), questionData.numberline);
  $scope.frogImg = RequireImages.get($scope.getImageContext(), questionData.frog);
  $scope.dottedcurvelineImg = RequireImages.get($scope.getImageContext(), questionData.dottedCurvedLine);
  $scope.leftPositions = questionData.leftPositions;

  $scope.next = next;
  $scope.check = check;
  $scope.getScoreboard = getScoreboard;
  $scope.onNumberClick = onNumberClick;
  $scope.getSketchPad = getSketchPad;
  $scope.inputClick    = inputClick;
  $scope.redo = redo;
  $scope.Clear = Clear;

  init();
  $scope.flag = -1;
  var checkIsEmpty = false,
  value = '';

  //for diasable chars
  function disableCharacter() {
    $timeout(function () {
      $('input').on('keypress', function (event) {
        var regex = new RegExp('^[]+$');
        var key   = String.fromCharCode(!event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
          event.preventDefault();
          return false;
        }
      });
    });
  }

  //Function for score board
  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // Game initialization function
  function init(){
    $scope.Scorecount=0;
    $scope.firstNumber = $scope.generateRandomNumber(10,1);
    $scope.secondNumber = $scope.generateRandomNumber(10,1);
    while($scope.secondNumber>$scope.firstNumber){
      $scope.firstNumber = $scope.generateRandomNumber(10,1);
    }

    var jump= $scope.secondNumber;

    $scope.numbers = [$scope.firstNumber, $scope.secondNumber];
    $scope.answer = ($scope.firstNumber  -  $scope.secondNumber);
    $('#input-text').val('');
    $scope.noOfJumps=_.range(0,jump);
    $scope.curvedcount=[];
    $scope.curvedcount=_.range(0,$scope.secondNumber);
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    angular.element('.check-button').removeClass('move-disable').addClass('move-enable');
    disableCharacter();

    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  //redo function
  function redo($event) {
    $event.preventDefault();
    angular.element('#input-value').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  function getSketchPad(sketchPad) {
    $scope.sketchPad = sketchPad;
  }

  // link the new button with newCanvas() function
  function Clear() {
    if ($scope.sketchPad) {
      $scope.sketchPad.clear();
    }
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();

    $('#input-value').val('');

    value = '';

    return false;
  }

   //check function
   function check($event) {
   $event.preventDefault();
     checkIsEmpty = _.isEmpty(value);
     var result = parseInt($('#input-value').val());
     if (checkIsEmpty === false) {
     if (result === $scope.answer) {
       $scope.Scorecount++;
       $scope.flag = 1;
       if($scope.Scorecount===1) {
         $scope.scoreboard.up();
       }
     } else {
       $scope.flag = 0;
     }
     }
   }

   function onNumberClick  ($event, num) {
      if (value.length <= 1) {
        value = value + '' + num;
      }
      else {
        value = value;
      }
      angular.element('#input-value').val(value);
   }
    function inputClick(index) {
      $scope.currentInput = index;
    }

}
