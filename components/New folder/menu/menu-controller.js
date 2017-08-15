
// We can get it from the GameData service as well but GameData is
// heavy so I am importing from json file

export default function menuController($scope, $state, $stateParams, $timeout, GameData, setScroll) {
  'ngInject';

  $scope.level     = $stateParams.level;
  $scope.currLevel = GameData.getCamelCase('levels.' + $scope.level);
  $scope.showLevel = $scope.currLevel.showLevel;

  $scope.header    = GameData.getCamelCase('levels.header');
  $scope.menu      = _.cloneDeep(GameData.getCamelCase('levels.menu'));

  setImages();

  $scope.openGame = function (category, game, subGame, index) {
    setScroll.setIndex(index);

    console.log('menu category, game, subGame, index ==>',category, game, subGame, index)

    var level = ($scope.level || '').toLowerCase();
    console.log("level: level, category: category, game: subGame", level, category, subGame)
    $state.go('app.home.level.menu.' + game, {level: level, category: category, game: subGame});
    console.log('game',{level: level, category: category, game: subGame});
  };
  //scrolling
  $timeout(function () {
    if ($('.scroll-container').size() === 0) {
      return;
    }

    // Cache selectors
    var topMenu         = $('.button-container'),
        arrow           = $('.arrow'),
        menuItems       = topMenu.find('.scroll-button'),
        height          = ($('.scroll-container')[0].scrollHeight * 98 / 100) / menuItems.length,
        initTop         = 14,
        remainingHeight = 75,  //monkey already set on 25 top position
        positionIndex   = 0,
        offScroll       = true,
        incrementTop    = 18,
        monkeyPositions = [68, 50, 32, 14];
    //console.log('height',height);

    var index = setScroll.getIndex();
    $('.scroll-container').scrollTop(index * height);
    $('.monkey').css({'top': initTop + (index * incrementTop) + '%'});

    window.onresize = function () {
      if ($('.scroll-container').size()) {
        //console.log('==>', $('.scroll-container')[0].scrollHeight, $('.scroll-container')[0].scrollHeight * 90 / 100);
        height = ($('.scroll-container')[0].scrollHeight * 98 / 100) / menuItems.length;
      }
    };

    function scrollPosition(index) {
      var scrollTop = (index * height),
          monkeyTop = initTop + (index * incrementTop);
      offScroll     = false;
      //var varyPosition  = (scrollTop == 200.25) ? 33 :-42;

      //scrollTop = scrollTop + scrollTop/6

      //setting the scroll bar top position
      $('.scroll-container').animate({
        scrollTop: scrollTop
      }, 300, function () {
        offScroll = !offScroll;
      });

      //setting the monkey top position
      $('.monkey').animate({'top': monkeyTop + '%'});
    }

    // Bind click handler to menu items
    // so we can get a fancy scroll animation
    menuItems.click(function () {
      var index = $(this).attr('path');
      scrollPosition(index);
    });


    //top and bottom arrow buttons
    arrow.click(function () {
      if ($(this).attr('button') === 'top' && positionIndex >= 0) {
        positionIndex = positionIndex === 0 ? positionIndex : positionIndex - 1;
        scrollPosition(positionIndex);

      } else if ($(this).attr('button') === 'bottom' && positionIndex <= 3) {
        positionIndex = positionIndex === 3 ? positionIndex : positionIndex + 1;
        scrollPosition(positionIndex);
      }
    });

    // Bind to scroll
    $('.scroll-container').scroll(function () {
      if ($('.scroll-container').size() === 0) {
        return;
      }

      var st   = $(this).scrollTop();
      var perc = (st * remainingHeight) / ($('.scroll-container')[0].scrollHeight) + initTop;

      //calculating the position index for top and bottom arrow click
      for (var i = 1; i <= monkeyPositions.length; i++) {
        if (perc > monkeyPositions[i - 1]) {
          positionIndex = monkeyPositions.length - i;
          setScroll.setIndex(positionIndex);
          break;
        }
      }

      //stoping the monkey scroll
      if (offScroll) {
        $('.monkey').css('top', perc + '%');
      }
    });
  }, 500);


  function setImages() {
    var imageContext = require.context('./images/', true, /.*\.svg$/);
    var levelPath    = './' + $scope.level + '/';

    _.forEach($scope.currLevel.categories, function (category, cKey) {
      var games   = category.games;
      var catPath = levelPath + _.kebabCase(category.key) + '/';

      _.forEach(games, function (game, key) {
        game.icon  = imageContext(catPath + game.path + '/' + game.path + '.svg');
        games[key] = game;
      });

      category.games                    = games;
      $scope.currLevel.categories[cKey] = category;
    });

    console.log('==>', $scope.currLevel);
  }


  //====== Common ======
  $scope.getUniqueId          = getUniqueId;
  $scope.generateRandomNumber = generateRandomNumber;

  /**
   * Get the unique id for ng-repeat
   *
   * @returns {string}
   *
   * @usage
   * <div ng-repeat="circle in circles | range track by getUniqueId()" class="circle">
   *
   * We can also use $index as per need. If you are accessing data attributes then use
   * `$(elem).get(0).getAttribute('data-number')` to avoid ng-repeat and jquery selector cashing.
   */
  function getUniqueId() {
    return new Date().getTime() + '-' + Math.random() * (100000 - 1) + 1;
  }

  // Generate random no.
  function generateRandomNumber(maxLimit, minLimit) {
    maxLimit = maxLimit || 5;
    minLimit = minLimit || 1;
    return Math.floor((Math.random() * (maxLimit)) + minLimit);
  }
}