require('./index.scss');

import chanceProbabilityTemplate from './index.html';
import chanceProbabilityController from './chance-probability-controller.js';

import chanceLevelATemplate from './chance/a/index.html';
import chanceLevelAController from './chance/a/chance-controller.js';

import chanceLevelBTemplate from './chance/b/index.html';
import chanceLevelBController from './chance/b/chance-controller.js';

import bagLevelBTemplate from './bag/b/index.html';
import bagLevelBController from './bag/b/bag-controller.js';


export default function chanceProbabilityRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.chance-probability', {
      url: '/:category/chance-probability'
    })
    .state('app.home.level.menu.chance-probability-game', {
      url: '/:category/chance-probability/:game',
      views: {
        'menu-page-view': {
          template: chanceProbabilityTemplate,
          controller: chanceProbabilityController
        },
        'chance.a@app.home.level.menu.chance-probability-game': {
          template: chanceLevelATemplate,
          controller: chanceLevelAController,
          resolve: {
            'preload-chance-probability-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'chance.b@app.home.level.menu.chance-probability-game': {
          template: chanceLevelBTemplate,
          controller: chanceLevelBController,
          resolve: {
            'preload-chance-probability-chance-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'bag.b@app.home.level.menu.chance-probability-game': {
          template: bagLevelBTemplate,
          controller: bagLevelBController,
          'preload-chance-probability-bag-b': function (preLoaderService, $stateParams) {
            'ngInject';

            var state = _.merge({}, this.self, {params: $stateParams || {}});
            var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

            return preLoaderService.loadImages(state, imageContext);
          }
        }
      }
    });
}