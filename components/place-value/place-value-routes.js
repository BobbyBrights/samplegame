import _ from 'lodash';

require('./index.scss');

import placeValueTemplate from './index.html';
import placeValueController from './place-value-controller.js';

import pencilePlaceValueLevelBTemplate from './pencile-place-value/b/index.html';
import pencilePlaceValueLevelBController from './pencile-place-value/b/pencile-place-value-controller.js';

import whiteboxPlaceValueLevelBTemplate from './whitebox-place-value/b/index.html';
import whiteboxPlaceValueLevelBController from './whitebox-place-value/b/whitebox-place-value-controller.js';

import circleboxPlaceValueLevelBTemplate from './circlebox-place-value/b/index.html';
import circleboxPlaceValueLevelBController from './circlebox-place-value/b/circlebox-place-value-controller.js';

import circlePlaceValueLevelBTemplate from './circle-place-value/b/index.html';
import circlePlaceValueLevelBController from './circle-place-value/b/circle-place-value-controller.js';



export default function placeValueRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.place-value', {
      url    : '/:category/place-value',
      abstract: true
    })
    .state('app.home.level.menu.place-value-game', {
        url   : '/:category/place-value/:game',
        views : {
          'menu-page-view' : {
              template  : placeValueTemplate,
              controller: placeValueController
          },
          'pencile-place-value.b@app.home.level.menu.place-value-game'   : {
            template  : pencilePlaceValueLevelBTemplate,
            controller: pencilePlaceValueLevelBController,
            resolve: {
              'preload-pencile-place-value-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'whitebox-place-value.b@app.home.level.menu.place-value-game'   : {
            template  : whiteboxPlaceValueLevelBTemplate,
            controller: whiteboxPlaceValueLevelBController,
            resolve: {
              'preload-whitebox-place-value-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'circlebox-place-value.b@app.home.level.menu.place-value-game'   : {
            template  : circleboxPlaceValueLevelBTemplate,
            controller: circleboxPlaceValueLevelBController,
            resolve: {
              'preload-circlebox-place-value-b': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'circle-place-value.b@app.home.level.menu.place-value-game'   : {
            template  : circlePlaceValueLevelBTemplate,
            controller: circlePlaceValueLevelBController,
            resolve: {
              'preload-circle-place-value-b': function (preLoaderService, $stateParams) {
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