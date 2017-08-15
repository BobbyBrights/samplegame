import _ from 'lodash';

require('./index.scss');

import multiplicationTemplate from './index.html';
import multiplicationController from './multiplication-controller.js';

import bugLevelBTemplate from './bug/b/index.html';
import bugLevelBController from './bug/b/bug-controller.js';

import curveLevelBTemplate from './curve/b/index.html';
import curveLevelBController from './curve/b/curve-controller.js';

import boxLevelBTemplate from './box/b/index.html';
import boxLevelBController from './box/b/box-controller.js';


import boxLevelCTemplate from './box/c/index.html';
import boxLevelCController from './box/c/box-controller.js';

import bugLevelCTemplate from './bug/c/index.html';
import bugLevelCController from './bug/c/bug-controller.js';

import curveLevelCTemplate from './curve/c/index.html';
import curveLevelCController from './curve/c/curve-controller.js';

import diceLevelCTemplate from './dice/c/index.html';
import diceLevelCController from './dice/c/dice-controller.js';

import commutativeLevelCTemplate from './commutative/c/index.html';
import commutativeLevelCController from './commutative/c/commutative-controller.js';

import tablesLevelCTemplate from './tables/c/index.html';
import tablesLevelCController from './tables/c/tables-controller.js';



export default function multiplicationRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.multiplication', {
      url    : '/:category/multiplication-game'
    })
    .state('app.home.level.menu.multiplication-game', {
        url   : '/:category/multiplication-game/:game',
        views : {
          'menu-page-view' : {
              template  : multiplicationTemplate,
              controller: multiplicationController
          }
          ,
          'bug.b@app.home.level.menu.multiplication-game'   : {
            template  : bugLevelBTemplate,
            controller: bugLevelBController
          }
          ,
          'curve.b@app.home.level.menu.multiplication-game'   : {
            template  : curveLevelBTemplate,
            controller: curveLevelBController
          }
          ,
          'box.b@app.home.level.menu.multiplication-game'   : {
            template  : boxLevelBTemplate,
            controller: boxLevelBController
          }
          ,
          'box.c@app.home.level.menu.multiplication-game'   : {
            template  : boxLevelCTemplate,
            controller: boxLevelCController
          }
          ,
          'bug.c@app.home.level.menu.multiplication-game'   : {
            template  : bugLevelCTemplate,
            controller: bugLevelCController
          }
          ,
          'curve.c@app.home.level.menu.multiplication-game'   : {
            template  : curveLevelCTemplate,
            controller: curveLevelCController
          }
          ,
          'dice.c@app.home.level.menu.multiplication-game'   : {
            template  : diceLevelCTemplate,
            controller: diceLevelCController
          }
          ,
          'commutative.c@app.home.level.menu.multiplication-game'   : {
            template  : commutativeLevelCTemplate,
            controller: commutativeLevelCController
          }
          ,
          'tables.c@app.home.level.menu.multiplication-game'   : {
            template  : tablesLevelCTemplate,
            controller: tablesLevelCController
          }
        }
    });
}