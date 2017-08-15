
export default function countBlocksController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'input-click-type.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.volume.types.input-click-type');

  var questionData         = gameData.home.question;
  $scope.questionText      = questionData.hint.text;
  $scope.correctAnswer     = questionData.correctAnswer;
  $scope.questionsBox      = questionData.questionsBox.text;
  $scope.questionsCenter = questionData.questionsCenter.text;
  $scope.header            = gameData.home.header;
  $scope.baseline          = questionData.baseline;

  // Set image path
  $scope.blockImages       = RequireImages.get($scope.getImageContext(), questionData.blockImages);


  // Set menu icons
  $scope.menu              = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next              = next;
  $scope.check             = check;
  $scope.redo              = redo;
  $scope.getScoreboard     = getScoreboard;

  var groupCounter         = 1,
    value                  ='';

  init();
  $scope.flag = -1;
  /*Disable the all special characters, alphabets and space in the input field*/
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

  // Game initialization function
  function init(){
    $scope.inputDisabled = false;
    value = '';
    $scope.blockBox = [];
    angular.element('.input-box').removeClass('move-disable');
    angular.element('.check-btn').removeClass('move-disable');
    angular.element('input').val('');
    groupCounter = ++groupCounter > 9 ? 0 : groupCounter;
    $scope.flag = -1;
    $scope.blockBox.push(groupCounter);
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    return false;
  }

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  // For check button click
  function check($event) {
    $event.preventDefault();
    var inputVal = angular.element('#input-1').val();
      if (inputVal) {
        inputVal = parseInt(inputVal);
        if (inputVal === $scope.correctAnswer[groupCounter]) {
          $scope.inputDisabled = true;
          $scope.scoreboard.upBy();
          $scope.flag = 1;
          angular.element('.input-box').addClass('move-disable');
          angular.element('.check-btns').addClass('move-disable');
        } else {
          $scope.flag = 0;
        }
      }
      return false;

  }

  // For redo button click
  function redo($event) {
    $event.preventDefault();
    $scope.inputDisabled = false;
    angular.element('#input-1').val('');
    value = '';
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

// For num-pad click
  $scope.onNumberClick = function ($event, num) {
    if($scope.flag === -1){
      if(num === 'backspace'){
        value = value.substring(0, value.length - 1);
      }else{
        value = value.length <= 1 ? value + '' + num : value;
      }
    }
    angular.element('#input-1').val(value);
  };
}