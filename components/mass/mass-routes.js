require('./index.scss');

import massTemplate from './index.html';
import massController from './mass-controller.js';

import dragTypeLevelATemplate from './drag-type/a/index.html';
import dragTypeLevelAController from './drag-type/main-drag-type-controller.js';

import dragTypeLevelBTemplate from './drag-type/a/index.html';
import dragTypeLevelBController from './drag-type/main-drag-type-controller.js';

import halfKgLevelCTemplate from './drag-type/c/half-kg/index.html';
import halfKgLevelCController from './drag-type/c/half-kg/half-kg-controller.js';

import oneKgLevelCTemplate from './drag-type/c/one-kg/index.html';
import oneKgLevelCController from './drag-type/c/one-kg/one-kg-controller.js';

import dragTypeLevelDTemplate from './drag-type/d/index.html';
import dragTypeLevelDController from './drag-type/d/drag-type-controller.js';

import dragTypeLevelETemplate from './drag-type/e/index.html';
import dragTypeLevelEController from './drag-type/e/drag-type-controller.js';

import inputTypeLevelBTemplate from './input-type/b/index.html';
import inputTypeLevelBController from './input-type/b/input-type-controller.js';

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

export default function massRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.mass', {
      url     : '/:category/mass',
      abstract: true
    })
    .state('app.home.level.menu.mass-game', {
      url  : '/:category/mass/:game',
      views: {
        'menu-page-view'                            : {
          template  : massTemplate,
          controller: massController
        },
        'drag-type.a@app.home.level.menu.mass-game' : {
          template  : dragTypeLevelATemplate,
          controller: dragTypeLevelAController,
          resolve   : {
            'preload-mass-drag-type-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'drag-type.b@app.home.level.menu.mass-game' : {
          template  : dragTypeLevelBTemplate,
          controller: dragTypeLevelBController,
          resolve   : {
            'preload-mass-drag-type-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'half-kg.c@app.home.level.menu.mass-game' : {
          template  : halfKgLevelCTemplate,
          controller: halfKgLevelCController,
          resolve   : {
            'preload-mass-half-kg.c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'one-kg.c@app.home.level.menu.mass-game' : {
          template  : oneKgLevelCTemplate,
          controller: oneKgLevelCController,
          resolve   : {
            'preload-mass-one-kg.c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'drag-type.d@app.home.level.menu.mass-game' : {
          template  : dragTypeLevelDTemplate,
          controller: dragTypeLevelDController
        },
        'drag-type.e@app.home.level.menu.mass-game' : {
          template  : dragTypeLevelETemplate,
          controller: dragTypeLevelEController
        },
        'input-type.b@app.home.level.menu.mass-game': {
          template  : inputTypeLevelBTemplate,
          controller: inputTypeLevelBController,
          resolve   : {
            'preload-mass-input-type-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'input-type.c@app.home.level.menu.mass-game': {
          template  : inputTypeLevelCTemplate,
          controller: inputTypeLevelCController,
          resolve   : {
            'preload-mass-input-type-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'input-type.d@app.home.level.menu.mass-game': {
          template  : inputTypeLevelDTemplate,
          controller: inputTypeLevelDController
        },
        'input-type.e@app.home.level.menu.mass-game': {
          template  : inputTypeLevelETemplate,
          controller: inputTypeLevelEController
        },
        'input-type.f@app.home.level.menu.mass-game': {
          template  : inputTypeLevelFTemplate,
          controller: inputTypeLevelFController
        },
        'input-type.g@app.home.level.menu.mass-game': {
          template  : inputTypeLevelGTemplate,
          controller: inputTypeLevelGController
        }
      }
    });
}