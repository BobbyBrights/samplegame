export default function preLoaderService($q, $rootScope, GameData, RequireImages, preLoaderImages) {
  'ngInject';

  this.loadImages = function (state, imageContext) {
    var deffered       = $q.defer(),
        currentState   = state,
        componentPath  = null,
        level, category, gameName, subGameName,
        imageLocations = [];

    if (currentState.params && currentState.params.category) {
      // For games and sub games
      level       = currentState.params.level;
      category    = currentState.params.category;
      gameName    = currentState.name.replace('app.home.level.menu.', '');
      subGameName = currentState.params.game;
      imageLocations = getGameImages(imageContext, level, category, gameName, subGameName);
    } else {
      // For main pages like welcome. home, menu
      var name      = currentState.name;
      level         = currentState.params && currentState.params.level;
      componentPath = name.replace(name.replace(/[^\.]+$/g, ''), '');

      if (level && componentPath === 'menu') {
        imageLocations = getMenuImages(level, imageContext);
        //Todo: implement ahead loading...
      } else {
        var gameData = GameData.getCamelCase(componentPath),
            preload  = gameData.preload;

        if (preload) {
          var images = RequireImages.get(imageContext, preload.images);
          _.each(images, function (n, key) {
            imageLocations.push({name: key, path: n.path});
          });
        }
      }
    }
    $rootScope.$broadcast('levelChange', level);
    //console.log('imageLocations =>', imageLocations);

    // Preload the images; then, update display when returned.
    if (!_.isEmpty(imageLocations)) {
      preLoaderImages.preloadImages(imageLocations).then(function success() {
          //console.log('Loading was successful', arguments);

          $rootScope.$broadcast('preloader:success', arguments);

          deffered.resolve();
        },
        function failure() {
          console.log('Loading failed', arguments);
          $rootScope.$broadcast('preloader:failure', arguments);
          deffered.reject();
        }, function notify(img) {
          $rootScope.$broadcast('preloader:notify', img);
          //console.log('notify', img.name, img.imageLocation, img.percent);
        });
    }
    return deffered.promise;

  };

  function getMenuImages(level, imageContext) {
    var gameData  = GameData.getCamelCase('levels.' + level),
        levelPath = './' + level + '/',
        images    = [];

    _.forEach(gameData.categories, function (category) {
      var games   = category.games,
          catPath = levelPath + _.kebabCase(category.key) + '/';

      _.forEach(games, function (game, key) {
        images.push({
          name: key,
          path: imageContext(catPath + game.path + '/' + game.path + '.svg')
        });
      });

    });

    return images;
  }

  //setting game images
  function getGameImages(imageContext, level, category, gameName, subGameName) {
    var gamePreloadPath = '';

    if (subGameName) {
      // gameName will have `game` suffix for  menu json so we need to remove it.
      gameName        = gameName.replace(/[^\-]+$/g, '').replace(/\-$/, '');
      gamePreloadPath = 'levels.' + level + '.categories.' + category + '.games.' + gameName + '.types.' +
        subGameName + '.preload';
    } else {
      gamePreloadPath = 'levels.' + level + '.categories.' + category + '.games.' + gameName + '.preload';
    }

    var gameData   = GameData.getCamelCase(gamePreloadPath),
        gameImages = [];

    _.forEach(gameData.images, function (category, key) {
      gameImages.push({
        name: key,
        path: imageContext('./' + category.path)
      });
    });

    return gameImages;
  }

}
