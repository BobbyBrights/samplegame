export default function fillContainerController($scope, $state, $stateParams, GameData, RequireImages, $cubes, $timeout)
  {
  'ngInject';

  $scope.gamePageView = 'fill-container'+ $scope.level;
    $scope.$cubes = $cubes;

    var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
      $stateParams.category + '.games.volume.types.fill-container');


    var questionData = gameData.home.question;
    $scope.questionText = questionData.hint.text;
    $scope.questionsBox = questionData.questionsBox.text;
    $scope.questionsCenter = questionData.questionsCenter.text;
    $scope.header = gameData.home.header;

    // Set image path
    $scope.playImage = RequireImages.get($scope.getImageContext(), questionData.playImage);
    $scope.staticImage = RequireImages.get($scope.getImageContext(), questionData.staticImage);
    $scope.randomImages = RequireImages.get($scope.getImageContext(), questionData.randomImages);
    $scope.counter = 0;

    var randomImages = $scope.randomImages,
      value = '',
      animPlaying,
      cubes;
    // Set menu icons
    $scope.menu = _.cloneDeep(gameData.menu);
    $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);

    //For more/next button click
    $scope.next = next;
    $scope.check = check;
    $scope.redo = redo;
    $scope.getScoreboard = getScoreboard;

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
    function init() {
      $scope.inputDisabled = false;
      value = '';
      angular.element('.input-box').removeClass('move-disable');
      angular.element('.check-btn').removeClass('move-disable');
      angular.element('input').val('');
      $scope.currCube = randomImages['square' + $scope.counter];
      $scope.flag = -1;
      animPlaying = false;
      cubes = parseInt($scope.currCube.cubes);
      $scope.counter = ++$scope.counter > 4 ? 0 : $scope.counter;
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

    function clearCubes() {
      for (var i = 1; i <= cubes; i++) {
        $('#cube' + i).css({display: 'none'})
      }
    }

    var cubeCnt;
    $scope.playAnimation = function () {
      if (!animPlaying) {
        animPlaying = true;
        clearCubes();
        cubeCnt = 1;
        var cubeInterval = setInterval(function () {
          if (cubeCnt <= cubes) {
            $('#cube' + cubeCnt).css({display: 'inline'});
            cubeCnt++;
          } else {
            clearInterval(cubeInterval);
            cubeInterval = undefined;
            animPlaying = false;
          }
          $scope.CountCube = cubeCnt - 1;
        }, 100);
      }
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
      if (inputVal) {
        inputVal = parseInt(inputVal);
        if (inputVal === ($scope.CountCube)) {
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
