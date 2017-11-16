
export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'input-type.c';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
                  $stateParams.category + '.games.volume.types.input-type');

  var questionData = gameData.home.question,
    value = '';
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.questionLabel = questionData.questionLabel.text;
  $scope.correctAnswer      = questionData.correctAnswer;


  // Set image path
  // $scope.inputTypeImages = RequireImages.get($scope.getImageContext(), gameData.home.images);
     $scope.displayBox = RequireImages.get($scope.getImageContext(), questionData.displayBox);
     $scope.inputImages = RequireImages.get($scope.getImageContext(), questionData.inputImages);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  //For more/next button click
  $scope.next = next;
  $scope.check              = check;
  $scope.redo               = redo;
  $scope.getScoreboard      = getScoreboard;
  var counter               = -1;

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

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
    $scope.blockImages = [];
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    value    = '';
    counter = ++counter > 19 ? 0 :counter;
    $scope.blockImages.push(counter);
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    init();
    angular.element('#input-1').val('');
    return false;
  }

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
    var inputVal = angular.element('input').val();
    $scope.checkClass = {tick: 'invisible', cross: 'visible'};
    if (parseInt(inputVal) === $scope.correctAnswer[counter]) {
      $scope.scoreboard.upBy();
      $scope.flag = 1;
      angular.element('.check-btns').addClass('move-disable');
    } else {
      $scope.flag = 0;
    }
    return false;
  }

}
