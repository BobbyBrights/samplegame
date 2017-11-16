export default function dragTypeController($scope, $state, $stateParams, GameData, RequireImages,$timeout) {
  'ngInject';

  $scope.gamePageView = 'drag-type.b';

  var gameData = GameData.getCamelCase('levels.' + $scope.level + '.categories.' +
    $stateParams.category + '.games.division.types.drag-type');

  var questionData = gameData.home.question;
  $scope.questionText = questionData.hint.text;
  $scope.header = gameData.home.header;
  $scope.flag = true;

  // Set menu icons
  $scope.menu = _.cloneDeep(gameData.menu);
  $scope.menu.left.buttons = RequireImages.get($scope.getImageContext(), gameData.menu.left.buttons);
  $scope.caterpillarImage = RequireImages.get($scope.getImageContext(), questionData.caterpillarImage);
  $scope.leafImage = RequireImages.get($scope.getImageContext(), questionData.leafImage);
  $scope.baseLine = RequireImages.get($scope.getImageContext(), questionData.baseLine);
  $scope.herculusMoth = RequireImages.get($scope.getImageContext(), questionData.herculusMoth);

  //For next button click
  $scope.next = next;
  $scope.check = check;
  $scope.redo = redo;
  $scope.onNumberClick = onNumberClick;
  $scope.inputClick    = inputClick;
  $scope.getScoreboard = getScoreboard;
  $scope.itemDropped = itemDropped;
  $scope.itemBadlyDropped = itemBadlyDropped;

  var counter = 0,
    data = {};

  formData();
  init();

  function getScoreboard(scoreboard) {
    $scope.scoreboard = scoreboard;
  }

  function onNumberClick($event, num) {
    var inputBox = $('#input-' + $scope.currentInput);
    var count = _.trim($(inputBox).val() || '');

    if (num === 'backspace') {
      count = count.substring(0, count.length - 1);
    } else if (count.length < 1) {
      count = count + '' + num;
    }
    $(inputBox).val(count);
  }

  function inputClick(index) {
    $scope.currentInput = index;
  }

  function formData() {
    var minTypes = 2,
      maxTypes = 4,
      typeTimes = 5,
      numbers = [6, 8, 10, 12, 4],
      drops = [3, 4, 5, 6, 2],
      count = 0;
    for (var i = minTypes; i <= maxTypes; i++) {
      for (var j = 1; j <= typeTimes; j++) {
        data['type' + count++] = {
          leafs: i,
          caterpillar: i == 2 ? numbers[j - 1] : i * j,
          dropZone: i == 2 ? drops[j - 1] : (i * j) / i
        };
      }
    }
  }

  function disableCharacter() {
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
  }

  // Game initialization function
  function init() {
    $scope.data = data['type' + counter++];
    console.log('data', $scope.data);
    $('.leaf .drop-area.occupied')
      .removeClass('occupied');

    $('.caterpillar-box .caterpillar.dropped')
      .css({'position': 'initial', 'top': 0, 'left': 0})
      .removeClass('dropped');
    angular.element('.caterpillar').removeClass('move-disable');
    if (counter > 14) {
      counter = 0;
    }
    if (counter % 5 === 1) {
      $timeout(function(){
        $scope.scoreboard.reset();
      },0);
    }
    $scope.inputPositions = questionData.inputPositions;
    angular.element('.action-btn').css({'pointer-events': 'auto'});
    $scope.currentInput = 2;
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    disableCharacter();
  }

  // For next button click
  function next($event) {
    $event.preventDefault();
    angular.element('#input-2').val('');
    init();

    return false;
  }

  // For check button click
  function check($event) {
    var result = ( $scope.data.caterpillar / $scope.data.leafs);
    var answer = angular.element('#input-2').val();

    if(answer!=''){
      if (result == answer) {
        $scope.flag = 1;
        angular.element('.check-btns').addClass('move-disable');
        angular.element('.action-btn').css({'pointer-events': 'none'});
        $scope.scoreboard.up();
      } else {
        $scope.flag = 0;
      }
    }

    return false;
  }

  function redo($event) {
    $event.preventDefault();
    angular.element('#input-2').val('');
    $scope.flag = -1;
    angular.element('.check-btns').removeClass('move-disable').addClass('move-enable');
    return false;
  }

  function itemDropped(dragItem, dropZone) {
    var emptyZone = $('.drop-area', dropZone).not('.occupied').first();
    if (emptyZone.size() === 0) {
      $(dragItem).css({'position': 'initial'});
      dragItem.goHome();
      return;
    }

    dragItem.dropOnto(dropZone);
    $scope.$apply(function () {
      $scope.scoreboard.up();
    });

    dragItem.addClass('move-disable');
    var dzPos = $(emptyZone).position();
    var treePos = $(dropZone).position();
    var top = treePos.top + dzPos.top,
      left = treePos.left + dzPos.left;

    $(emptyZone).addClass('occupied');

    dragItem
      .addClass('dropped')
      .css({
        top: top,
        left: left,
        position: 'absolute'
      });
  }

  function itemBadlyDropped(item) {
    item.goHome();
  }
}
