/**
 * A utility method to retrieve the json data after inherits all data from various modules
 *
 * @author Amitesh Kumar
 *
 * @usage
 *
 * var a = GameData.get('levels.a.categories');
 * console.log('levels.a.categories =>', a);
 * console.log(a['algebra-patterns'].games.beads.path);
 *
 */

import _ from 'lodash';

export default function GameDataService($stateParams, $state) {
  'ngInject';

  var gameData;
  var gameDataCamelCase;

  function load() {
    if (!gameData) {
      gameData = require('!json!./../../data/game-data.json');
    }

    if (!gameDataCamelCase) {
      gameDataCamelCase = require('!json!./../../data/game-data-in-camel-case.json');
    }

    console.log('gameData => ', gameData);
    //console.log('gameDataCamelCase => ', gameDataCamelCase);

    if (!gameData) {
      throw 'Game data file not found at => ./../../data/game-data.json';
    }

    if (!gameDataCamelCase) {
      throw 'Game data in camel case file not found at => ./../../data/game-data-in-camel-case.json';
    }
  }


  /**
   * Set the hyphenated keys to camelCase. It will help to retrive data through chaining.
   *
   * It will keep the both hyphenated and camelCase as well.
   * @param  {[type]} collection [description]
   * @return {[type]}            [description]
   */
  function formatKeyBoth(collection) { // jshint ignore:line
    return _.each(collection, function (o, key) {
      var ccKey = _.isNumber(key) ? key : _.camelCase(key || '');

      if (_.isObject(o)) {
        let formattedValue = formatKeyBoth(o);
        if (ccKey !== key) {
          let oldValue      = collection[ccKey];
          collection[ccKey] = oldValue ? formatKeyBoth(oldValue) : formattedValue;
        }
        collection[key] = formattedValue;

      } else {
        if (ccKey !== key) {
          let oldValue      = collection[ccKey];
          collection[ccKey] = oldValue ? oldValue : o;
        }
        collection[key] = o;
      }
    });
  }

  /**
   * Set key to only hyphenated key and value. But it will be a problem
   * with array type and retrieval of values through chaining
   *
   * @param  {[type]} collection [description]
   * @return {[type]}            [description]
   */
  function formatKeyAsCamelCase(collection) {
    return _.each(collection, function (o, key) {
      var ccKey    = _.isNumber(key) ? key : _.camelCase(key || '');
      let oldValue = collection[ccKey];

      if (_.isObject(o)) {
        let formattedValue = formatKeyAsCamelCase(o);
        delete collection[key];
        collection[ccKey] = oldValue ? formatKeyAsCamelCase(oldValue) : formattedValue;
      } else {
        delete collection[key];
        collection[ccKey] = oldValue ? oldValue : o;
      }
    });
  }

  // Load all gameData
  load();

  /**
   * Get the value from the data on the basis of key
   * @param  {[type]} key [description]
   * @return {[type]}     [description]
   *
   * @usage
   *  get('levels.a.categories.number.games.more-count')
   */
  this.get = function (key) {
    if (!key) {
      return gameData;
    }

    var keys = (key || '').split('.');

    var val = gameData;
    for (var i = 0; i < keys.length; i++) {
      if (val) {
        val = val[keys[i]];
      }
    }

    return val;
  };

  this.getCamelCase = function (key) {
    if (!gameDataCamelCase) {
      gameDataCamelCase = formatKeyAsCamelCase(_.cloneDeep(gameData));
    }

    if (!key) {
      return gameDataCamelCase;
    }

    var keys = (key || '').split('.');
    var val  = gameDataCamelCase;

    for (var i = 0; i < keys.length; i++) {
      if (val) {
        // for formatKeyOnlyCamelCase
        let ccKey = _.camelCase(keys[i] === 0 ? '0' : keys[i]);
        val       = val[ccKey];
      }
    }

    return val;
  };

  /**
   * Lazy wrapper for getCamelCase function
   * which fills all the required data by getCamelCase
   * if your current stateName differs with name in data.json
   * provide game name explicitly in parameter
   *
   */

  this.getCurrentGame = function (gameName) {
    var level    = $stateParams.level,
        category = $stateParams.category,
        game     = gameName;

    if (!game) {
      var stateArr = $state.current.name.split('.');
      game         = stateArr[stateArr.length - 1];
    }

    if (!level || !category) {
      throw new Error('Invalid inputs at getCurrentGame');
    }

    return this.getCamelCase('levels.' + level + '.categories.' +
      category + '.games.' + game);
  };

}