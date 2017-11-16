require('./index.scss');

import volumeTemplate from './index.html';
import volumeController from './volume-controller.js';

import dragTypeLevelATemplate from './drag-type/a/index.html';
import dragTypeLevelAController from './drag-type/a/drag-type-controller.js';

import fillContainerLevelBTemplate from './fill-container/b/index.html';
import fillContainerLevelBController from './fill-container/main-fill-container-controller.js';

import fillContainerLevelCTemplate from './fill-container/c/index.html';
import fillContainerLevelCController from './fill-container/main-fill-container-controller.js';

import clickTypeLevelGTemplate from './click-type/g/index.html';
import clickTypeLevelGController from './click-type/g/click-type-controller.js';

import inputClickTypeLevelBTemplate from './input-click-type/b/index.html';
import inputClickTypeLevelBController from './input-click-type/b/input-click-type-controller.js';

import inputClickTypeLevelDTemplate from './input-click-type/d/index.html';
import inputClickTypeLevelDController from './input-click-type/d/input-click-type-controller.js';

import inputClickTypeLevelETemplate from './input-click-type/e/index.html';
import inputClickTypeLevelEController from './input-click-type/e/input-click-type-controller.js';

import inputClickTypeLevelFTemplate from './input-click-type/f/index.html';
import inputClickTypeLevelFController from './input-click-type/f/input-click-type-controller.js';

import inputClickTypeLevelGTemplate from './input-click-type/g/index.html';
import inputClickTypeLevelGController from './input-click-type/g/input-click-type-controller.js';

import inputTypeLevelCTemplate from './input-type/c/index.html';
import inputTypeLevelCController from './input-type/c/input-type-controller.js';

import inputTypeLevelDTemplate from './input-type/d/index.html';
import inputTypeLevelDController from './input-type/d/input-type-controller.js';

import inputTypeLevelETemplate from './input-type/e/index.html';
import inputTypeLevelEController from './input-type/e/input-type-controller.js';

import inputTypeLevelFTemplate from './input-type/f/index.html';
import inputTypeLevelFController from './input-type/f/input-type-controller.js';

import inputTypeLevelGTemplate from './input-type/g/index.html';
import inputTypeLevelGController from './input-type/g/input-type-controller.js';


export default function volumeRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.volume', {
      url     : '/:category/volume',
      abstract: true
    })
    .state('app.home.level.menu.volume-game', {
      url  : '/:category/volume/:game',
      views: {
        'menu-page-view'                                    : {
          template  : volumeTemplate,
          controller: volumeController
        },
        'drag-type.a@app.home.level.menu.volume-game'       : {
          template  : dragTypeLevelATemplate,
          controller: dragTypeLevelAController,
          resolve: {
            'preload-volume-drag-type-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);
              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'fill-container.b@app.home.level.menu.volume-game'  : {
          template  : fillContainerLevelBTemplate,
          controller: fillContainerLevelBController,
          resolve   : {
            'preload-fill-container-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            },

            $cubes: function (svgObject) {
              var assets = require('./fill-container/images/cubes.xml');
              return svgObject.initSVG(assets);
            }
          }
        },

        'fill-container.c@app.home.level.menu.volume-game'  : {
          template  : fillContainerLevelCTemplate,
          controller: fillContainerLevelCController,
          resolve   : {
            'preload-fill-container-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            },

            $cubes: function (svgObject) {
              var assets = require('./fill-container/images/cubes.xml');
              return svgObject.initSVG(assets);
            }
          }
        },

        'click-type.g@app.home.level.menu.volume-game'      : {
          template  : clickTypeLevelGTemplate,
          controller: clickTypeLevelGController
        },
        'input-click-type.b@app.home.level.menu.volume-game': {
          template  : inputClickTypeLevelBTemplate,
          controller: inputClickTypeLevelBController,
          resolve   : {
            'preload-input-click-type-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'input-click-type.d@app.home.level.menu.volume-game': {
          template  : inputClickTypeLevelDTemplate,
          controller: inputClickTypeLevelDController
        },
        'input-click-type.e@app.home.level.menu.volume-game': {
          template  : inputClickTypeLevelETemplate,
          controller: inputClickTypeLevelEController
        },
        'input-click-type.f@app.home.level.menu.volume-game': {
          template  : inputClickTypeLevelFTemplate,
          controller: inputClickTypeLevelFController
        },
        'input-click-type.g@app.home.level.menu.volume-game': {
          template  : inputClickTypeLevelGTemplate,
          controller: inputClickTypeLevelGController
        },
        'input-type.c@app.home.level.menu.volume-game'      : {
          template  : inputTypeLevelCTemplate,
          controller: inputTypeLevelCController,
          resolve   : {
            'preload-input-type-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'input-type.d@app.home.level.menu.volume-game'      : {
          template  : inputTypeLevelDTemplate,
          controller: inputTypeLevelDController
        },
        'input-type.e@app.home.level.menu.volume-game'      : {
          template  : inputTypeLevelETemplate,
          controller: inputTypeLevelEController
        },
        'input-type.f@app.home.level.menu.volume-game'      : {
          template  : inputTypeLevelFTemplate,
          controller: inputTypeLevelFController
        },
        'input-type.g@app.home.level.menu.volume-game'      : {
          template  : inputTypeLevelGTemplate,
          controller: inputTypeLevelGController
        }
      }
    });
}