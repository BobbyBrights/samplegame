import _ from 'lodash';

require('./index.scss');

import numberOrderingTemplate from './index.html';
import numberOrderingController from './number-ordering-controller.js';

import beforeLevelCTemplate from './before/c/index.html';
import beforeLevelCController from './before/c/before-controller.js';

import afterLevelCTemplate from './after/c/index.html';
import afterLevelCController from './after/c/after-controller.js';

import inOrderLevelCTemplate from './in-order/c/index.html';
import inOrderLevelCController from './in-order/c/in-order-controller.js';


export default function numberOrderingRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.number-ordering', {
      url: '/:category/number-ordering',
      abstract: true
    })
    .state('app.home.level.menu.number-ordering-game', {
      url: '/:category/number-ordering/:game',
      views: {
        'menu-page-view': {
          template: numberOrderingTemplate,
          controller: numberOrderingController,
        }
        ,
        'before.c@app.home.level.menu.number-ordering-game': {
          template: beforeLevelCTemplate,
          controller: beforeLevelCController,
          resolve: {
            'preload-number-ordering-before': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        }
        ,
        'after.c@app.home.level.menu.number-ordering-game': {
          template: afterLevelCTemplate,
          controller: afterLevelCController,
          resolve: {
            'preload-number-ordering-after': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        }
        ,
        'in-order.c@app.home.level.menu.number-ordering-game': {
          template: inOrderLevelCTemplate,
          controller: inOrderLevelCController,
          resolve: {
            'preload-number-ordering-order': function (preLoaderService, $stateParams) {
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