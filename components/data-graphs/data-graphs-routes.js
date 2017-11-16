require('./index.scss');

import dataGraphsTemplate from './index.html';
import dataGraphsController from './data-graphs-controller.js';

import animalLevelATemplate from './animal/a/index.html';
import animalLevelAController from './animal/a/animal-controller.js';

import animalLevelBTemplate from './animal/b/index.html';
import animalLevelBController from './animal/b/animal-controller.js';

import fruitLevelATemplate from './fruit/a/index.html';
import fruitLevelAController from './fruit/a/fruit-controller.js';

import fruitLevelBTemplate from './fruit/b/index.html';
import fruitLevelBController from './fruit/b/fruit-controller.js';

import weatherLevelATemplate from './weather/a/index.html';
import weatherLevelAController from './weather/a/weather-controller.js';

import blockLevelBTemplate from './block/b/index.html';
import blockLevelBController from './block/b/block-controller.js';


export default function dataGraphsRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.data-graphs', {

      url: '/:category/data-graphs',
      abstract: true
    })
    .state('app.home.level.menu.data-graphs-game', {
      url: '/:category/data-graphs/:game',
      views: {
        'menu-page-view': {
          template: dataGraphsTemplate,
          controller: dataGraphsController
        },
        'animal.a@app.home.level.menu.data-graphs-game': {
          template: animalLevelATemplate,
          controller: animalLevelAController,
          resolve: {
            'preload-data-graphs-animal-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'animal.b@app.home.level.menu.data-graphs-game': {
          template: animalLevelBTemplate,
          controller: animalLevelBController,
          resolve: {
            'preload-data-graphs-animal-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'fruit.a@app.home.level.menu.data-graphs-game': {
          template: fruitLevelATemplate,
          controller: fruitLevelAController,
          resolve: {
            'preload-data-graphs-fruit-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'fruit.b@app.home.level.menu.data-graphs-game': {
          template: fruitLevelBTemplate,
          controller: fruitLevelBController,
          resolve: {
            'preload-data-graphs-fruit-b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'weather.a@app.home.level.menu.data-graphs-game': {
          template: weatherLevelATemplate,
          controller: weatherLevelAController,
          resolve: {
            'preload-data-graphs-weather-a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'block.b@app.home.level.menu.data-graphs-game': {
          template: blockLevelBTemplate,
          controller: blockLevelBController,
          resolve: {
            'preload-data-graphs-block-b': function (preLoaderService, $stateParams) {
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