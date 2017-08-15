import _ from 'lodash';

require('./index.scss');

import roundingToTemplate from './index.html';
import roundingToController from './rounding-to-controller.js';

import tenLevelCTemplate from './ten/c/index.html';
import tenLevelCController from './ten/c/ten-controller.js';

import tenLevelDTemplate from './ten/d/index.html';
import tenLevelDController from './ten/d/ten-controller.js';

import hundredLevelCTemplate from './hundred/c/index.html';
import hundredLevelCController from './hundred/c/hundred-controller.js';

import hundredLevelDTemplate from './hundred/d/index.html';
import hundredLevelDController from './hundred/d/hundred-controller.js';

import thousandLevelDTemplate from './thousand/d/index.html';
import thousandLevelDController from './thousand/d/thousand-controller.js';



export default function roundingToRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.rounding-to', {
      url    : '/:category/rounding-to',
      abstract: true
    })
    .state('app.home.level.menu.rounding-to-game', {
        url   : '/:category/rounding-to/:game',
        views : {
          'menu-page-view' : {
              template  : roundingToTemplate,
              controller: roundingToController
          }
          ,
          'ten.c@app.home.level.menu.rounding-to-game'   : {
            template  : tenLevelCTemplate,
            controller: tenLevelCController
          }
          ,
          'ten.d@app.home.level.menu.rounding-to-game'   : {
            template  : tenLevelDTemplate,
            controller: tenLevelDController
          }
          ,
          'hundred.c@app.home.level.menu.rounding-to-game'   : {
            template  : hundredLevelCTemplate,
            controller: hundredLevelCController
          }
          ,
          'hundred.d@app.home.level.menu.rounding-to-game'   : {
            template  : hundredLevelDTemplate,
            controller: hundredLevelDController
          }
          ,
          'thousand.d@app.home.level.menu.rounding-to-game'   : {
            template  : thousandLevelDTemplate,
            controller: thousandLevelDController
          }
        }
    });
}