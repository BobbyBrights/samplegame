import _ from 'lodash';

require('./index.scss');

import divisionTemplate from './index.html';
import divisionController from './division-controller.js';

import dragTypeLevelBTemplate from './drag-type/b/index.html';
import dragTypeLevelBController from './drag-type/b/drag-type-controller.js';

import inputTypeLevelBTemplate from './input-type/b/index.html';
import inputTypeLevelBController from './input-type/b/input-type-controller.js';

import inputTypeLevelCBeetalTemplate from './input-type/c/beetal/index.html';
import inputTypeLevelCBeetalController from './input-type/c/beetal/input-type-controller.js';

import inputTypeLevelCDiceTemplate from './input-type/c/dice/index.html';
import inputTypeLevelCDiceController from './input-type/c/dice/input-type-controller.js';

import inputTypeLevelCReverseInverseTemplate from './input-type/c/reverse-inverse/index.html';
import inputTypeLevelCReverseInverseController from './input-type/c/reverse-inverse/input-type-controller.js';

import inputTypeLevelDTemplate from './input-type/d/index.html';
import inputTypeLevelDController from './input-type/d/input-type-controller.js';

import inputTypeLevelETemplate from './input-type/e/index.html';
import inputTypeLevelEController from './input-type/e/input-type-controller.js';

import inputTypeLevelFTemplate from './input-type/f/index.html';
import inputTypeLevelFController from './input-type/f/input-type-controller.js';

import inputTypeLevelGTemplate from './input-type/g/index.html';
import inputTypeLevelGController from './input-type/g/input-type-controller.js';


export default function divisionRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.division', {
      url    : '/:category/division',
      abstract: true
    })
    .state('app.home.level.menu.division-game', {
        url   : '/:category/division/:game',
        views : {
          'menu-page-view' : {
              template  : divisionTemplate,
              controller: divisionController
          },
          'drag-type.b@app.home.level.menu.division-game'   : {
            template  : dragTypeLevelBTemplate,
            controller: dragTypeLevelBController,
            resolve: {
              'preload-drag-type-b': function (preLoaderService, $stateParams) {
                'ngInject';
                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'input-type.b@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelBTemplate,
            controller: inputTypeLevelBController,
            resolve: {
              'preload-input-type-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'beetal.c@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelCBeetalTemplate,
            controller: inputTypeLevelCBeetalController,
            resolve: {
              'preload-beetal-c': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'dice.c@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelCDiceTemplate,
            controller: inputTypeLevelCDiceController,
            resolve: {
              'preload-dice-c': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'reverse-inverse.c@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelCReverseInverseTemplate,
            controller: inputTypeLevelCReverseInverseController,
            resolve: {
              'preload-reverse-inverse-c': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          }
          ,
          'input-type.d@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelDTemplate,
            controller: inputTypeLevelDController
          }
          ,
          'input-type.e@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelETemplate,
            controller: inputTypeLevelEController
          }
          ,
          'input-type.f@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelFTemplate,
            controller: inputTypeLevelFController
          }
          ,
          'input-type.g@app.home.level.menu.division-game'   : {
            template  : inputTypeLevelGTemplate,
            controller: inputTypeLevelGController
          }
        }
    });
}