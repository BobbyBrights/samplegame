require('./index.scss');

import threeDShapesTemplate from './index.html';
import threeDShapesController from './three-d-shapes-controller.js';

import dragTypeLevelATemplate from './drag-type/a/index.html';
import dragTypeLevelAController from './drag-type/a/drag-type-controller.js';

import sortingLevelBTemplate from './drag-type/b/sorting/index.html';
import sortingLevelBController from './drag-type/b/sorting/drag-type-controller.js';

import clickTypeLevelATemplate from './click-type/a/index.html';
import clickTypeLevelAController from './click-type/a/click-type-controller.js';

import viewLevelBTemplate from './click-type/b/view/index.html';
import viewLevelBController from './click-type/b/view/click-type-controller.js';

import namesLevelBTemplate from './click-type/b/names/index.html';
import namesLevelBController from './click-type/b/names/click-type-controller.js';

import quizLevelBTemplate from './click-type/b/quiz/index.html';
import quizLevelBController from './click-type/b/quiz/click-type-controller.js';

import clickTypeLevelCTemplate from './click-type/c/index.html';
import clickTypeLevelCController from './click-type/c/click-type-controller.js';

import clickTypeLevelDTemplate from './click-type/d/index.html';
import clickTypeLevelDController from './click-type/d/click-type-controller.js';

import clickTypeLevelETemplate from './click-type/e/index.html';
import clickTypeLevelEController from './click-type/e/click-type-controller.js';

import clickTypeLevelFTemplate from './click-type/f/index.html';
import clickTypeLevelFController from './click-type/f/click-type-controller.js';

import clickTypeLevelGTemplate from './click-type/g/index.html';
import clickTypeLevelGController from './click-type/g/click-type-controller.js';

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


export default function threeDShapesRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.three-d-shapes', {
      url: '/:category/three-d-shapes-game',
      abstract: true
    })
    .state('app.home.level.menu.three-d-shapes-game', {
      url: '/:category/three-d-shapes-game/:game',
      views: {
        'menu-page-view': {
          template: threeDShapesTemplate,
          controller: threeDShapesController
        },
        'drag-type.a@app.home.level.menu.three-d-shapes-game': {
          template: dragTypeLevelATemplate,
          controller: dragTypeLevelAController,
          resolve: {
            'preload-drag-type-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'sorting.b@app.home.level.menu.three-d-shapes-game': {
          template: sortingLevelBTemplate,
          controller: sortingLevelBController,
          resolve: {
            'preload-sorting-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'click-type.a@app.home.level.menu.three-d-shapes-game': {
          template: clickTypeLevelATemplate,
          controller: clickTypeLevelAController,
          resolve: {
            'preload-click-type-a': function (preLoaderService, $stateParams) {
              'ngInject';
              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'names.b@app.home.level.menu.three-d-shapes-game': {
          template: namesLevelBTemplate,
          controller: namesLevelBController,
          resolve: {
            'preload-names-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'quiz.b@app.home.level.menu.three-d-shapes-game': {
          template: quizLevelBTemplate,
          controller: quizLevelBController,
          resolve: {
            'preload-quiz-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'view.b@app.home.level.menu.three-d-shapes-game': {
          template: viewLevelBTemplate,
          controller: viewLevelBController,
          resolve: {
            'preload-view-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'click-type.c@app.home.level.menu.three-d-shapes-game': {
          template: clickTypeLevelCTemplate,
          controller: clickTypeLevelCController
        },
        'click-type.d@app.home.level.menu.three-d-shapes-game': {
          template: clickTypeLevelDTemplate,
          controller: clickTypeLevelDController
        },
        'click-type.e@app.home.level.menu.three-d-shapes-game': {
          template: clickTypeLevelETemplate,
          controller: clickTypeLevelEController
        },
        'click-type.f@app.home.level.menu.three-d-shapes-game': {
          template: clickTypeLevelFTemplate,
          controller: clickTypeLevelFController
        },
        'click-type.g@app.home.level.menu.three-d-shapes-game': {
          template: clickTypeLevelGTemplate,
          controller: clickTypeLevelGController
        },
        'input-type.c@app.home.level.menu.three-d-shapes-game': {
          template: inputTypeLevelCTemplate,
          controller: inputTypeLevelCController
        },
        'input-type.d@app.home.level.menu.three-d-shapes-game': {
          template: inputTypeLevelDTemplate,
          controller: inputTypeLevelDController
        },
        'input-type.e@app.home.level.menu.three-d-shapes-game': {
          template: inputTypeLevelETemplate,
          controller: inputTypeLevelEController
        },
        'input-type.f@app.home.level.menu.three-d-shapes-game': {
          template: inputTypeLevelFTemplate,
          controller: inputTypeLevelFController
        },
        'input-type.g@app.home.level.menu.three-d-shapes-game': {
          template: inputTypeLevelGTemplate,
          controller: inputTypeLevelGController
        }
      }
    });
}