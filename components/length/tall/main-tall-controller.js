
export default function tallController($scope, $state, $stateParams, GameData, RequireImages, $timeout) {
  'ngInject';

  $scope.gamePageView = 'tall'+ $scope.level;

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.length.types.tall');

  var questionData      = gameData.home.question,
      value = '';
  $scope.questionText   = questionData.hint.text;
  $scope.header       = gameData.home.header;
  $scope.footerText     = gameData.home.footer.text;
  $scope.baseline          = questionData.baseline;
  $scope.correctAnswer  = questionData.correctAnswer;
  var checkIsEmpty = false;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons  = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

  $scope.sign               =  RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.tallImages         =  RequireImages.get($scope.getImageContext(), questionData.tallImages);
  $scope.images             = RequireImages.get($scope.getImageContext(), gameData.home.images);
  $scope.display            = RequireImages.get($scope.getImageContext(), questionData.display);
  //For more/next button click
  $scope.next     = next;
  $scope.check    = check;
  $scope.redo     = redo;
  $scope.getScoreboard = getScoreboard;
  var counter     = -1;


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
    $scope.butterfly = [];
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    value    = '';
    angular.element('.image-item-0').css({left: '3%', top: '1%'});
    counter = ++counter > 6 ? 0 :counter;
    $scope.butterfly.push(counter);
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

  // For more button click
  function check($event) {
    $event.preventDefault();
    var inputVal = angular.element('#input-1').val();
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
    if (item.id !== 'drag') {
      item.goHome();
    }
  };
}
