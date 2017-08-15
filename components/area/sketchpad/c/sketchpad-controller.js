export default function sketchpadController($scope, $state, $stateParams, GameData, RequireImages) {
  'ngInject';

  $scope.gamePageView = 'sketchpad.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.area.types.sketchpad');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;

  //For to draw table
  $scope.rows = _.range(1, 16);
  $scope.columns = _.take($scope.rows, 7);

  // Set image path
  $scope.stampImages = RequireImages.get($scope.getImageContext(), questionData.stampImages);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  var inputValues = questionData.inputValues,
    minLimit = 0,
    value = '';


  //For more/next button click
  $scope.next = next;
  $scope.getSketchPad = getSketchPad;
  $scope.Clear = Clear;
  $scope.reset = reset;
  $scope.check = check;
  $scope.redo = redo;
  $scope.getScoreboard = getScoreboard;
  $scope.HideAndShow = HideAndShow;


  init();

  // Game initialization function
  function init() {
    $scope.flag = -1;
    $scope.inputDisabled = false;
    $scope.hideButtonText = 'Hide';
    value = '';
    angular.element('input').val('');
    $scope.imageCount = [];
    $scope.imageCount.push(minLimit);
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    Clear();
  }

 //function for scoreboard
  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // For reset button click
  function reset() {
    $scope.scoreboard.reset();
    return false;
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    minLimit = minLimit + 1;

    if (minLimit === 6) {
      minLimit = 0;
      if (minLimit === 0) {
        reset();
      }
    }

    init();
    return false;
  }

//for SketchPad
  function getSketchPad(sketchPad) {
    $scope.sketchPad = sketchPad;
  }

  // link the new button with newCanvas() function
  function Clear() {
    if ($scope.sketchPad) {
      $scope.sketchPad.clear();
    }
  }

//Function for hide and show button
  function HideAndShow () {
    if($scope.hideButtonText==='Hide'){
      $scope.hideButtonText = 'Show';
      $('#stamp').addClass('invisible');
    }else{
      $scope.hideButtonText = 'Hide';
      $('#stamp').removeClass('invisible');
    }
  }


  $scope.onNumberClick = function ($event, num) {
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }
    angular.element('#input-1').val(value);
  };

  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('#input-1').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    var inputVal = angular.element('#input-1').val();
    if (inputVal) {
      $scope.inputDisabled = true;
      if (parseInt(inputVal) === inputValues[$scope.imageCount]) {
        $scope.scoreboard.up();
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

}