require('./index.scss');

import positionTemplate from './index.html';
import positionController from './position-controller.js';

import dragTypeATemplate from './drag-type/a/index.html';
import dragTypeAController from './drag-type/a/drag-type-controller.js';

import wordsLevelBTemplate from './words/b/index.html';
import wordsLevelBController from './words/b/words-controller.js';

import gridsLevelBTemplate from './grids/b/index.html';
import gridsLevelBController from './grids/b/grids-controller.js';

import pathsLevelBTemplate from './paths/b/index.html';
import pathsLevelBController from './paths/b/paths-controller.js';



export default function positionRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.position', {
      url    : '/:category/position',
      //abstract: true
    })
    .state('app.home.level.menu.position-game', {
      url   : '/:category/position/:game',
      views : {
        'menu-page-view' : {
          template  : positionTemplate,
          controller: positionController
        },
        'drag-type.a@app.home.level.menu.position-game'   : {
          template  : dragTypeATemplate,
          controller: dragTypeAController,
          resolve   : {
            'preload-drag-type-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'words.b@app.home.level.menu.position-game'   : {
          template  : wordsLevelBTemplate,
          controller: wordsLevelBController,
          resolve   : {
            'preload-words-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'grids.b@app.home.level.menu.position-game'   : {
          template  : gridsLevelBTemplate,
          controller: gridsLevelBController,
          resolve   : {
            'preload-grids-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'paths.b@app.home.level.menu.position-game'   : {
          template  : pathsLevelBTemplate,
          controller: pathsLevelBController,
          resolve   : {
            'preload-paths-b': function (preLoaderService, $stateParams) {
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