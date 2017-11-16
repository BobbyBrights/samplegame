
require('./index.scss');

import areaTemplate from './index.html';
import areaController from './area-controller.js';

import dragTypeLevelATemplate from './drag-type/a/index.html';
import dragTypeLevelAController from './drag-type/a/drag-type-controller.js';

import gridDragLevelBTemplate from './grid-drag/b/index.html';
import gridDragLevelBController from './grid-drag/b/grid-drag-controller.js';

import gridDragLevelCTemplate from './grid-drag/c/index.html';
import gridDragLevelCController from './grid-drag/c/grid-drag-controller.js';

import gridDragLevelDTemplate from './grid-drag/d/index.html';
import gridDragLevelDController from './grid-drag/d/grid-drag-controller.js';

import gridDragLevelETemplate from './grid-drag/e/index.html';
import gridDragLevelEController from './grid-drag/e/grid-drag-controller.js';

import multiSquareDragLevelBTemplate from './multi-square-drag/b/index.html';
import multiSquareDragLevelBController from './multi-square-drag/b/multi-square-drag-controller.js';

import multiSquareDragLevelCTemplate from './multi-square-drag/c/index.html';
import multiSquareDragLevelCController from './multi-square-drag/c/multi-square-drag-controller.js';

import sketchpadLevelCTemplate from './sketchpad/c/index.html';
import sketchpadLevelCController from './sketchpad/c/sketchpad-controller.js';

import sketchpadLevelDTemplate from './sketchpad/d/index.html';
import sketchpadLevelDController from './sketchpad/d/sketchpad-controller.js';

import sketchpadLevelETemplate from './sketchpad/e/index.html';
import sketchpadLevelEController from './sketchpad/e/sketchpad-controller.js';

import squareGridLevelDTemplate from './square-grid/d/index.html';
import squareGridLevelDController from './square-grid/d/square-grid-controller.js';

import squareGridLevelETemplate from './square-grid/e/index.html';
import squareGridLevelEController from './square-grid/e/square-grid-controller.js';

import dotPaperLevelDTemplate from './dot-paper/d/index.html';
import dotPaperLevelDController from './dot-paper/d/dot-paper-controller.js';

import dotPaperLevelETemplate from './dot-paper/e/index.html';
import dotPaperLevelEController from './dot-paper/e/dot-paper-controller.js';


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

export default function areaRoutes($stateProvider) {
  'ngInject';
  $stateProvider
    .state('app.home.level.menu.area', {
      url: '/:category/area-game',
    })
    .state('app.home.level.menu.area-game', {
      url  : '/:category/area-game/:game',
      views: {
        'menu-page-view'                            : {
          template  : areaTemplate,
          controller: areaController
        },
        'drag-type.a@app.home.level.menu.area-game' : {
          template  : dragTypeLevelATemplate,
          controller: dragTypeLevelAController,
          resolve: {
            'preload-area-drag-type-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'grid-drag.b@app.home.level.menu.area-game'   : {
          template  : gridDragLevelBTemplate,
          controller: gridDragLevelBController,
          resolve: {
            'preload-area-grid-drag-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'grid-drag.c@app.home.level.menu.area-game'   : {
          template  : gridDragLevelCTemplate,
          controller: gridDragLevelCController,
          resolve: {
            'preload-area-grid-drag-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'grid-drag.d@app.home.level.menu.area-game'   : {
          template  : gridDragLevelDTemplate,
          controller: gridDragLevelDController
        },
        'grid-drag.e@app.home.level.menu.area-game'   : {
          template  : gridDragLevelETemplate,
          controller: gridDragLevelEController
        },
        'multi-square-drag.b@app.home.level.menu.area-game'   : {
          template  : multiSquareDragLevelBTemplate,
          controller: multiSquareDragLevelBController,
          resolve: {
            'preload-area-multi-square-drag-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'multi-square-drag.c@app.home.level.menu.area-game'   : {
          template  : multiSquareDragLevelCTemplate,
          controller: multiSquareDragLevelCController,
          resolve: {
            'preload-area-multi-square-drag-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'sketchpad.c@app.home.level.menu.area-game'   : {
          template  : sketchpadLevelCTemplate,
          controller: sketchpadLevelCController,
          resolve: {
            'preload-area-sketchpad-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'sketchpad.d@app.home.level.menu.area-game'   : {
          template  : sketchpadLevelDTemplate,
          controller: sketchpadLevelDController
        },
        'sketchpad.e@app.home.level.menu.area-game'   : {
          template  : sketchpadLevelETemplate,
          controller: sketchpadLevelEController
        },
        'square-grid.d@app.home.level.menu.area-game'   : {
          template  : squareGridLevelDTemplate,
          controller: squareGridLevelDController
        },
        'square-grid.e@app.home.level.menu.area-game'   : {
          template  : squareGridLevelETemplate,
          controller: squareGridLevelEController
        },
        'dot-paper.d@app.home.level.menu.area-game'   : {
          template  : dotPaperLevelDTemplate,
          controller: dotPaperLevelDController
        },
        'dot-paper.e@app.home.level.menu.area-game'   : {
          template  : dotPaperLevelETemplate,
          controller: dotPaperLevelEController
        },
        'input-type.b@app.home.level.menu.area-game': {
          template  : inputTypeLevelBTemplate,
          controller: inputTypeLevelBController
        },
        'input-type.c@app.home.level.menu.area-game': {
          template  : inputTypeLevelCTemplate,
          controller: inputTypeLevelCController,
          resolve: {
            'preload-area-input-type-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'input-type.d@app.home.level.menu.area-game': {
          template  : inputTypeLevelDTemplate,
          controller: inputTypeLevelDController
        },
        'input-type.e@app.home.level.menu.area-game': {
          template  : inputTypeLevelETemplate,
          controller: inputTypeLevelEController
        },
        'input-type.f@app.home.level.menu.area-game': {
          template  : inputTypeLevelFTemplate,
          controller: inputTypeLevelFController
        },
        'input-type.g@app.home.level.menu.area-game': {
          template  : inputTypeLevelGTemplate,
          controller: inputTypeLevelGController
        }
      }
    });
}