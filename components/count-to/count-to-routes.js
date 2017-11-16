require('./index.scss');

import countToTemplate from './index.html';
import countToController from './count-to-controller.js';

import frogLevelBTemplate from './frog/b/index.html';
import frogLevelBController from './frog/b/frog-controller.js';

import countLevelBTemplate from './counter/b/index.html';
import countLevelBController from './counter/b/counter-controller.js';

import blockLevelBTemplate from './block/b/index.html';
import blockLevelBController from './block/b/block-controller.js';


export default function countToRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.count-to', {
      url     : '/:category/count-to',
      views: {
        'menu-page-view': {
          template: countToTemplate,
          controller: countToController
        }
      }
    })
    .state('app.home.level.menu.count-to-game', {
      url  : '/:category/count-to/:game',
      isGamePage: false,
      resolve: {
        isGameSelected: function ($q, $stateParams) {
          return _.isEmpty($stateParams.game) ? $q.reject() : $q.resolve();
        }
      },
      views: {
        'menu-page-view'                             : {
          template  : countToTemplate,
          controller: countToController
        },
        'frog.b@app.home.level.menu.count-to-game'   : {
          template  : frogLevelBTemplate,
          controller: frogLevelBController,
          resolve: {
            'preload-frog-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'counter.b@app.home.level.menu.count-to-game': {
          template  : countLevelBTemplate,
          controller: countLevelBController,
          resolve: {
            'preload-counter-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'block.b@app.home.level.menu.count-to-game'  : {
          template  : blockLevelBTemplate,
          controller: blockLevelBController,
          resolve: {
            'preload-block-b': function (preLoaderService, $stateParams) {
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