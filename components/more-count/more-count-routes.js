
require('./index.scss');

import moreCountTemplate from './index.html';
import moreCountController from './more-count-controller.js';

import frogLevelATemplate from './frog/a/index.html';
import frogLevelAController from './frog/a/frog-controller.js';
import blockLevelATemplate from './block/a/index.html';
import blockLevelAController from './block/a/block-controller.js';
import counterLevelATemplate from './counter/a/index.html';
import counterLevelAController from './counter/a/counter-controller.js';


export default function moreCountRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.more-count', {
      url: '/:category/more-count',
      views: {
        'menu-page-view': {
          template: moreCountTemplate,
          controller: moreCountController
        }
      }
    })
    .state('app.home.level.menu.more-count-game', {

      url: '/:category/more-count/:game',
      views: {
        'menu-page-view': {
          template: moreCountTemplate,
          controller: moreCountController,
          isGamePage: true,
          resolve: {
            isGameSelected: function ($q, $stateParams) {
              return _.isEmpty($stateParams.game) ? $q.reject() : $q.resolve();
            }
          }
        },
        'frog.a@app.home.level.menu.more-count-game': {
          template: frogLevelATemplate,
          controller: frogLevelAController,
          resolve: {
            'preload-frog-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'block.a@app.home.level.menu.more-count-game': {
          template: blockLevelATemplate,
          controller: blockLevelAController,
          resolve: {
            'preload-block-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'counter.a@app.home.level.menu.more-count-game': {
          template: counterLevelATemplate,
          controller: counterLevelAController,
          resolve: {
            'preload-counter-a': function (preLoaderService, $stateParams) {
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
