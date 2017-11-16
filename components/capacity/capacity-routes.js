require('./index.scss');

import capacityTemplate from './index.html';
import capacityController from './capacity-controller.js';


import dragTypeLevelATemplate from './drag-type/a/index.html';
import dragTypeLevelAController from './drag-type/a/drag-type-controller.js';

import dragTypeLevelBTemplate from './drag-type/b/index.html';
import dragTypeLevelBController from './drag-type/b/drag-type-controller.js';

import dragTypeLevelCTemplate from './drag-type/c/index.html';
import dragTypeLevelCController from './drag-type/c/drag-type-controller.js';

import dragHalfTypeLevelCTemplate from './drag-half-type/c/index.html';
import dragHalfTypeLevelCController from './drag-half-type/c/drag-half-type-controller.js';

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


export default function capacityRoutes($stateProvider) {
  'ngInject';

  var assets;

  $stateProvider
    .state('app.home.level.menu.capacity', {
      url: '/:category/capacity'
    })
    .state('app.home.level.menu.capacity-game', {
      url: '/:category/capacity/:game',
      views: {
        'menu-page-view': {
          template: capacityTemplate,
          controller: capacityController
        },
        'drag-type.a@app.home.level.menu.capacity-game': {
          resolve: {
            'preload-capacity-drag-type-a': function (preLoaderService, $stateParams) {
              'ngInject';
               var state = _.merge({}, this.self, {params: $stateParams || {}});
               var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);
               return preLoaderService.loadImages(state, imageContext);
             },
            $cover: function (svgObject) {
              assets = require('./drag-type/a/images/cover.xml');
              return svgObject.initSVG(assets);
            }
          },
          template: dragTypeLevelATemplate,
          controller: dragTypeLevelAController
        },
        'drag-type.b@app.home.level.menu.capacity-game': {
          template: dragTypeLevelBTemplate,
          controller: dragTypeLevelBController,
          resolve: {
            'preload-capacity-drag-type-b': function (preLoaderService, $stateParams) {
               'ngInject';
               var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

               return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'drag-type.c@app.home.level.menu.capacity-game': {
          template: dragTypeLevelCTemplate,
          controller: dragTypeLevelCController,
          resolve: {
            'preload-capacity-drag-type-c': function (preLoaderService, $stateParams) {
              'ngInject';
              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'input-type.b@app.home.level.menu.capacity-game': {
          template: inputTypeLevelBTemplate,
          controller: inputTypeLevelBController,
          resolve: {
             'preload-capacity-input-type-b': function (preLoaderService, $stateParams) {
              'ngInject';
               var state = _.merge({}, this.self, {params: $stateParams || {}});
               var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

               return preLoaderService.loadImages(state, imageContext);
             }
          }
        },
        'input-type.c@app.home.level.menu.capacity-game': {
          template: inputTypeLevelCTemplate,
          controller: inputTypeLevelCController,
          resolve: {
            'preload-capacity-input-type-c': function (preLoaderService, $stateParams) {
              'ngInject';
              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'input-type.d@app.home.level.menu.capacity-game': {
          template: inputTypeLevelDTemplate,
          controller: inputTypeLevelDController
        },
        'input-type.e@app.home.level.menu.capacity-game': {
          template: inputTypeLevelETemplate,
          controller: inputTypeLevelEController
        },
        'input-type.f@app.home.level.menu.capacity-game': {
          template: inputTypeLevelFTemplate,
          controller: inputTypeLevelFController
        },
        'input-type.g@app.home.level.menu.capacity-game': {
          template: inputTypeLevelGTemplate,
          controller: inputTypeLevelGController
        },
        'drag-half-type.c@app.home.level.menu.capacity-game': {
          template: dragHalfTypeLevelCTemplate,
          controller: dragHalfTypeLevelCController,
          resolve: {
            'preload-capacity-drag-half-type-c': function (preLoaderService, $stateParams) {
              'ngInject';
              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        }
      }
    });
}

