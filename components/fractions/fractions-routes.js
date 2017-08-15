import _ from 'lodash';

require('./index.scss');

import fractionsTemplate from './index.html';
import fractionsController from './fractions-controller.js';

import halvesLevelBTemplate from './halves/b/index.html';
import halvesLevelBController from './halves/b/halves-controller.js';

import halvesLevelCTemplate from './halves/c/index.html';
import halvesLevelCController from './halves/c/halves-controller.js';

import quartersLevelBTemplate from './quarters/b/index.html';
import quartersLevelBController from './quarters/b/quarters-controller.js';

import quartersLevelCTemplate from './quarters/c/index.html';
import quartersLevelCController from './quarters/c/quarters-controller.js';


export default function fractionsRoutes($stateProvider) {
  'ngInject';

  var assets;

  $stateProvider
    .state('app.home.level.menu.fractions', {
      url: '/:category/fractions-game',
      abstract: true
    })

    .state('app.home.level.menu.fractions-game', {
      url: '/:category/fractions-game/:game',
      resolve: {
        $svg: function (svgObject) {
          assets = require('./halves/images/asset.xml');
          return svgObject.initSVG(assets);
        }
      },
      views: {
        'menu-page-view': {
          template: fractionsTemplate,
          controller: fractionsController,
                 },
        'halves.b@app.home.level.menu.fractions-game': {
          template: halvesLevelBTemplate,
          controller: halvesLevelBController,
          resolve: {
            'preload-fractions-halves-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'halves.c@app.home.level.menu.fractions-game': {
          template: halvesLevelCTemplate,
          controller: halvesLevelCController,
          resolve: {
            'preload-fractions-halves-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'quarters.b@app.home.level.menu.fractions-game': {
          template: quartersLevelBTemplate,
          controller: quartersLevelBController,
          resolve: {
            'preload-fractions-quarters-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'quarters.c@app.home.level.menu.fractions-game': {
          template: quartersLevelCTemplate,
          controller: quartersLevelCController,
          resolve: {
            'preload-fractions-quarters-c': function (preLoaderService, $stateParams) {
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