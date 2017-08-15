require('./index.scss');

import twoDShapesTemplate from './index.html';
import twoDShapesController from './two-d-shapes-controller.js';

import findLevelATemplate from './find/a/index.html';
import findLevelAController from './find/a/find-controller.js';

import matchLevelATemplate from './match/a/index.html';
import matchLevelAController from './match/a/match-controller.js';

import traceLevelATemplate from './trace/a/index.html';
import traceLevelAController from './trace/a/trace-controller.js';

import sideCornersLevelBTemplate from './side-corners/b/index.html';
import sideCornersLevelBController from './side-corners/b/side-corners-controller.js';

import sideCornersLevelCTemplate from './side-corners/c/index.html';
import sideCornersLevelCController from './side-corners/c/side-corners-controller.js';

import sideCornersLevelDTemplate from './side-corners/d/index.html';
import sideCornersLevelDController from './side-corners/d/side-corners-controller.js';

import sideCornersLevelETemplate from './side-corners/e/index.html';
import sideCornersLevelEController from './side-corners/e/side-corners-controller.js';

import flipSlideLevelBTemplate from './flip-slide/b/index.html';
import flipSlideLevelBController from './flip-slide/b/flip-slide-controller.js';

import flipSlideLevelCTemplate from './flip-slide/c/index.html';
import flipSlideLevelCController from './flip-slide/c/flip-slide-controller.js';

import flipSlideLevelDTemplate from './flip-slide/d/index.html';
import flipSlideLevelDController from './flip-slide/d/flip-slide-controller.js';

import flipSlideLevelETemplate from './flip-slide/e/index.html';
import flipSlideLevelEController from './flip-slide/e/flip-slide-controller.js';

import anglesLevelBTemplate from './angles/b/index.html';
import anglesLevelBController from './angles/b/angles-controller.js';

import anglesLevelCTemplate from './angles/c/index.html';
import anglesLevelCController from './angles/c/angles-controller.js';

import anglesLevelDTemplate from './angles/d/index.html';
import anglesLevelDController from './angles/d/angles-controller.js';

import anglesLevelETemplate from './angles/e/index.html';
import anglesLevelEController from './angles/e/angles-controller.js';

import namesLevelBTemplate from './names/b/index.html';
import namesLevelBController from './names/b/names-controller.js';


export default function twoDShapesRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.two-d-shapes', {
      url: '/:category/two-d-shapes-game',
      abstract: true
    })
    .state('app.home.level.menu.two-d-shapes-game', {
      url: '/:category/two-d-shapes-game/:game',
      views: {
        'menu-page-view': {
          template: twoDShapesTemplate,
          controller: twoDShapesController
        },
        'find.a@app.home.level.menu.two-d-shapes-game': {
          template: findLevelATemplate,
          controller: findLevelAController,
          resolve: {
            'preload-two-d-shapes-find-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'match.a@app.home.level.menu.two-d-shapes-game': {
          template: matchLevelATemplate,
          controller: matchLevelAController,
          resolve: {
            'preload-two-d-shapes-match-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'trace.a@app.home.level.menu.two-d-shapes-game': {
          template: traceLevelATemplate,
          controller: traceLevelAController,
          resolve: {
            'preload-two-d-shapes-trace-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'side-corners.b@app.home.level.menu.two-d-shapes-game': {
          template: sideCornersLevelBTemplate,
          controller: sideCornersLevelBController,
          resolve: {
            'preload-two-d-shapes-side-corners-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'side-corners.c@app.home.level.menu.two-d-shapes-game': {
          template: sideCornersLevelCTemplate,
          controller: sideCornersLevelCController
        },
        'side-corners.d@app.home.level.menu.two-d-shapes-game': {
          template: sideCornersLevelDTemplate,
          controller: sideCornersLevelDController
        },
        'side-corners.e@app.home.level.menu.two-d-shapes-game': {
          template: sideCornersLevelETemplate,
          controller: sideCornersLevelEController
        },
        'flip-slide.b@app.home.level.menu.two-d-shapes-game': {
          template: flipSlideLevelBTemplate,
          controller: flipSlideLevelBController,
          resolve: {
            'preload-two-d-shapes-flip-slide-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'flip-slide.c@app.home.level.menu.two-d-shapes-game': {
          template: flipSlideLevelCTemplate,
          controller: flipSlideLevelCController
        },
        'flip-slide.d@app.home.level.menu.two-d-shapes-game': {
          template: flipSlideLevelDTemplate,
          controller: flipSlideLevelDController
        },
        'flip-slide.e@app.home.level.menu.two-d-shapes-game': {
          template: flipSlideLevelETemplate,
          controller: flipSlideLevelEController
        },
        'angles.b@app.home.level.menu.two-d-shapes-game': {
          template: anglesLevelBTemplate,
          controller: anglesLevelBController,
          resolve: {
            'preload-two-d-shapes-angles-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'angles.c@app.home.level.menu.two-d-shapes-game': {
          template: anglesLevelCTemplate,
          controller: anglesLevelCController
        },
        'angles.d@app.home.level.menu.two-d-shapes-game': {
          template: anglesLevelDTemplate,
          controller: anglesLevelDController
        },
        'angles.e@app.home.level.menu.two-d-shapes-game': {
          template: anglesLevelETemplate,
          controller: anglesLevelEController
        },
        'names.b@app.home.level.menu.two-d-shapes-game': {
          template: namesLevelBTemplate,
          controller: namesLevelBController,
          resolve: {
            'preload-two-d-shapes-names-b': function (preLoaderService, $stateParams) {
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