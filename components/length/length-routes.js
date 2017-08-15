require('./index.scss');

import lengthTemplate from './index.html';
import lengthController from './length-controller.js';

import longerLevelATemplate from './longer/a/index.html';
import longerLevelAController from './longer/a/longer-controller.js';

import tallerLevelATemplate from './taller/a/index.html';
import tallerLevelAController from './taller/a/taller-controller.js';

import closerLevelATemplate from './closer/a/index.html';
import closerLevelAController from './closer/a/closer-controller.js';


import longLevelBTemplate from './long/b/index.html';
import longLevelBController from './long/main-long-controller.js';

import longLevelCTemplate from './long/c/index.html';
import longLevelCController from './long/main-long-controller.js';

import tallLevelBTemplate from './tall/b/index.html';
import tallLevelBController from './tall/main-tall-controller.js';

import tallLevelCTemplate from './tall/c/index.html';
import tallLevelCController from './tall/main-tall-controller.js';

import metreLevelBTemplate from './metre/b/index.html';
import metreLevelBController from './metre/main-metre-controller.js';

import metreLevelCTemplate from './metre/c/index.html';
import metreLevelCController from './metre/main-metre-controller.js';

import metresLevelCTemplate from './metres/c/index.html';
import metresLevelCController from './metres/c/metres-controller.js';



export default function lengthRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.length', {
      url     : '/:category/length',
      abstract: true
    })
    .state('app.home.level.menu.length-game', {
      url  : '/:category/length/:game',
      views: {
        'menu-page-view'                          : {
          template  : lengthTemplate,
          controller: lengthController
        },
        'longer.a@app.home.level.menu.length-game': {
          template: longerLevelATemplate,
          controller: longerLevelAController,
          resolve: {
            'preload-length-longer-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'taller.a@app.home.level.menu.length-game': {
          template: tallerLevelATemplate,
          controller: tallerLevelAController,
          resolve: {
            'preload-length-taller-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'closer.a@app.home.level.menu.length-game': {
          template: closerLevelATemplate,
          controller: closerLevelAController,
          resolve: {
            'preload-length-closer-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'long.b@app.home.level.menu.length-game'   : {
          template  : longLevelBTemplate,
          controller: longLevelBController,
          resolve: {
            'preload-length-long-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'long.c@app.home.level.menu.length-game'   : {
          template  : longLevelCTemplate,
          controller: longLevelCController,
          resolve: {
            'preload-length-long-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'tall.b@app.home.level.menu.length-game'   : {
          template  : tallLevelBTemplate,
          controller: tallLevelBController,
          resolve: {
            'preload-length-tall-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'tall.c@app.home.level.menu.length-game'   : {
          template  : tallLevelCTemplate,
          controller: tallLevelCController,
          resolve: {
            'preload-length-tall-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'metre.b@app.home.level.menu.length-game'   : {
          template  : metreLevelBTemplate,
          controller: metreLevelBController,
          resolve: {
            'preload-length-metre-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'metre.c@app.home.level.menu.length-game'   : {
          template  : metreLevelCTemplate,
          controller: metreLevelCController,
          resolve: {
            'preload-length-metre-c': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'metres.c@app.home.level.menu.length-game'   : {
          template  : metresLevelCTemplate,
          controller: metresLevelCController,
          resolve: {
            'preload-length-metres-c': function (preLoaderService, $stateParams) {
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
