import _ from 'lodash';

require('./index.scss');

import additionTemplate from './index.html';
import additionController from './addition-controller.js';

import oneDiceLevelBTemplate from './one-dice/b/index.html';
import oneDiceLevelBController from './one-dice/b/one-dice-controller.js';

import twoDiceLevelBTemplate from './two-dice/b/index.html';
import twoDiceLevelBController from './two-dice/b/two-dice-controller.js';

import numberLineLevelBTemplate from './number-line/b/index.html';
import numberLineLevelBController from './number-line/b/number-line-controller.js';

import toTwentyLevelBTemplate from './to-twenty/b/index.html';
import toTwentyLevelBController from './to-twenty/b/to-twenty-controller.js';

import balanceLevelBTemplate from './balance/b/index.html';
import balanceLevelBController from './balance/b/balance-controller.js';



export default function additionRoutes($stateProvider) {
  'ngInject';

  var assets;

  $stateProvider
    .state('app.home.level.menu.addition', {
      url    : '/:category/addition',
      abstract: true
    })
    .state('app.home.level.menu.addition-game', {
        url   : '/:category/addition/:game',
        resolve: {
          $gameSvg: function (svgObject) {
            assets = require('../../assets/addition/asset.xml');
            return svgObject.initSVG(assets);           
          }
        },
        views : {
          'menu-page-view' : {
              template  : additionTemplate,
              controller: additionController
          },
          'one-dice.b@app.home.level.menu.addition-game'   : {
            template  : oneDiceLevelBTemplate,
            controller: oneDiceLevelBController,
            resolve: {
              'preload-one-dice-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'two-dice.b@app.home.level.menu.addition-game'   : {
            template  : twoDiceLevelBTemplate,
            controller: twoDiceLevelBController,
            resolve: {
              'preload-two-dice-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'number-line.b@app.home.level.menu.addition-game'   : {
            template  : numberLineLevelBTemplate,
            controller: numberLineLevelBController,
            resolve: {
              'preload-number-line-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'to-twenty.b@app.home.level.menu.addition-game'   : {
            template  : toTwentyLevelBTemplate,
            controller: toTwentyLevelBController,
            resolve: {
              'preload-to-twenty-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'balance.b@app.home.level.menu.addition-game'   : {
            template  : balanceLevelBTemplate,
            controller: balanceLevelBController,
            resolve: {
              'preload-balance-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          }
        }
    });
}