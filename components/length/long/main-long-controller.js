export default function longController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'long'+ $scope.level;

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.length.types.long');
  var questionData          = gameData.home.question,
    value = '';
  $scope.header             = gameData.home.header;
  $scope.questionText       = questionData.hint.text;
  $scope.questionLabel      = questionData.questionLabel.text;
  $scope.correctAnswer      = questionData.correctAnswer;
  $scope.drag               = questionData.drag;

  // Set menu icons
  $scope.menu               = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons  = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.sign               =  RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.dragImage          =  RequireImages.get($scope.getImageContext(), questionData.dragImage);
  $scope.longImages         =  RequireImages.get($scope.getImageContext(), questionData.longImages );


  $scope.next               = next;
  $scope.check              = check;
  $scope.redo               = redo;
  $scope.getScoreboard      = getScoreboard;
  var counter               = -1;
  var checkIsEmpty = false;
  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  init();

  // $scope.flag = -1;
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
  function init() {

    $scope.flyImages = [];
    $scope.flag = -1;
    value    = '';
    angular.element('.drag').css({left: '45%', top: '60%'});
    angular.element('.drag-scale').css({left: '23%', top: '60%'});
    counter = ++counter > 9 ? 0 :counter;
    $scope.flyImages.push(counter);
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
  }
  init();

  // For next button click
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
    checkIsEmpty = _.isEmpty($scope.shapeNames);
    if (checkIsEmpty === false) {
      if (parseInt(inputVal) === $scope.correctAnswer[counter]) {
        $scope.scoreboard.upBy();
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
      } else {
        $scope.flag = 0;
      }
    }
    return false;
  }

  $scope.itemBadlyDropped = function (item) {
    if (item.id !== 'pin') {
      item.goHome();
    }
  };
}

