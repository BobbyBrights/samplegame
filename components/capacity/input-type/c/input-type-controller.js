
export default function inputTypeController($scope, $state, $stateParams, GameData, RequireImages, $timeout, $interval,
                                            $rootScope) {
  'ngInject';

  $scope.gamePageView = 'input-type.c';


  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.capacity.types.input-type');

  var questionData = gameData.home.question;
  var count = 0,
    moveJar = questionData.answer[$scope.fillCount],
    intId,
    dropGap,
    droptStarting,
    isGlassFill,
    inputIndex    = null,
    emptyString   = _.toString(null),
    value         = emptyString;

  $scope.questionText = questionData.hint.text;
  $scope.text = ["Estimate","Actual Measure"];
  $scope.questionLabel = questionData.questionLabel;
  $scope.header = gameData.home.header;
  $scope.fillCount = 0;
  // Set image path
  $scope.Images = RequireImages.get($scope.getImageContext(), gameData.home.images);

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.signs = RequireImages.get($scope.getImageContext(), questionData.sign);
  $scope.ContainerImages = RequireImages.get($scope.getImageContext(), questionData.images);

  $scope.noOfImages = 5;
  $scope.answer = questionData.answer[$scope.fillCount];
  //For more/next button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;
  $scope.getScoreboard = getScoreboard;
  $scope.fill = fill;
  $scope.inputClick    = inputClick;
  $scope.onNumberClick = onNumberClick;
  $scope.inputs = [];
  $scope.inputBox = false;
  var answers = questionData.answer;
  var checkButton;

  init();

  // Game initialization function
  function init() {
    count = 0;
    isGlassFill = false;
    $scope.inputBox = false;
    $scope.flag = -1;
    inputIndex = null;
    $scope.fillState = false;
    $interval.cancel(intId);
    var fillImageKey = (questionData['fillImages'][$scope.fillCount]);
    var emptyImageKey = (questionData['emptyImages'][$scope.fillCount]);
    var fillImage =  questionData.images[fillImageKey];
    var emptyImage =  questionData.images[emptyImageKey];
    $scope.images = RequireImages.get($scope.getImageContext(), emptyImage);
    $scope.fillImages = RequireImages.get($scope.getImageContext(),fillImage);
    $scope.left = fillImage.left;
    $scope.top = fillImage.top;
    $scope.diff = fillImage.diff;
    dropGap =  $scope.images.dropGap;
    droptStarting = $scope.images.droptStarting;
    $scope.inputs[0] = '';
    $scope.inputs[1] = '';
    for(var i = 0; i < 5; i++){
      $('#fill' + i).removeClass('fill-glass');
    }
  }

  // For more button click
  function next($event) {
    $event.preventDefault();
    $scope.fillCount = $scope.fillCount == 2 ? 0 : $scope.fillCount + 1;
    init();
    moveJar = questionData.answer[$scope.fillCount];
    return false;
  }

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  function fill($event) {
    $event.preventDefault();
    if(!isGlassFill){
      $('#fill').addClass('disable');
      $scope.fillState = true;
      moveJar = questionData.answer[$scope.fillCount];
      $('#fill0').addClass('fill-glass');
      intId = $interval(fillingWater, 1000, moveJar);
      $scope.waterJugPosition = droptStarting + dropGap;
    }else {
      isGlassFill = false;
      for(var i = 0; i <= moveJar; i++){
        $('#fill'+i).removeClass('fill-glass')
      }
    }
  }

  function check($event) {
    $event.preventDefault();
    $scope.inputBox = true;
    if ($scope.flag === -1) {
      if (($scope.inputs[0] > 0) && ($scope.inputs[1] > 0)) {
        if (($scope.inputs[0] == $scope.noOfImages) && ($scope.inputs[1] == answers[$scope.fillCount])) {
          $scope.flag = 1;
          $scope.scoreboard.upBy();
        } else {
          $scope.flag = 0;
        }
      }
    }
    return false;
  }
  function redo($event) {
    $event.preventDefault();
    $scope.inputBox = false;
    $scope.flag = -1;
    $scope.inputs[0] = '';
    $scope.inputs[1] = '';
    console.log('sfasfas');
    return false;
  }

  function fillingWater() {
    count += 1;
    if (count == moveJar) {
      $('#fill').removeClass('disable');
      count = 0;
      isGlassFill = true;
      $scope.fillState = false;
      $scope.waterJugPosition = droptStarting;
      $interval.cancel(intId);
    }
    $('#fill' + count).addClass('fill-glass');

    $scope.waterJugPosition += dropGap;
  }

  /*check button enable and disable*/
  $rootScope.$watch(function(){
    $(':input').each(function () {
      var val = $(this).val();
      if (val == '') {
        angular.element('.check-btns').addClass('disable');
      }else{
        angular.element('.check-btns').removeClass('disable');
      }
    });
  });

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

  function inputClick(index) {
    value = emptyString;
    inputIndex = index;
  }

  function onNumberClick($event, num) {
    if ($scope.flag === -1) {
      if (num === 'backspace') {
        value = value.substring(0, value.length - 1);
      } else {
        value = value.length <= 1 ? value + '' + num : value;
      }
    }

    $scope.inputs[inputIndex] = value;
  };
}