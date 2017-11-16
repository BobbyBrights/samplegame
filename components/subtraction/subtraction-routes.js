import _ from 'lodash';

require('./index.scss');

import subtractionTemplate from './index.html';
import subtractionController from './subtraction-controller.js';

import circlesLevelBTemplate from './circles/b/index.html';
import circlesLevelBController from './circles/b/circles-controller.js';

import circlesLevelCTemplate from './circles/c/index.html';
import circlesLevelCController from './circles/c/circles-controller.js';

import frogLevelBTemplate from './frog/b/index.html';
import frogLevelBController from './frog/b/frog-controller.js';

import frogLevelCTemplate from './frog/c/index.html';
import frogLevelCController from './frog/c/frog-controller.js';

import frogLevelDTemplate from './frog/d/index.html';
import frogLevelDController from './frog/d/frog-controller.js';

import plusAndMinusLevelBTemplate from './plus-and-minus/b/index.html';
import plusAndMinusLevelBController from './plus-and-minus/b/plus-and-minus-controller.js';

import plusAndMinusLevelCTemplate from './plus-and-minus/c/index.html';
import plusAndMinusLevelCController from './plus-and-minus/c/plus-and-minus-controller.js';

import tensLevelCTemplate from './tens/c/index.html';
import tensLevelCController from './tens/c/tens-controller.js';

import tensLevelDTemplate from './tens/d/index.html';
import tensLevelDController from './tens/d/tens-controller.js';

import tensLevelETemplate from './tens/e/index.html';
import tensLevelEController from './tens/e/tens-controller.js';

import hundredsLevelCTemplate from './hundreds/c/index.html';
import hundredsLevelCController from './hundreds/c/hundreds-controller.js';

import hundredsLevelDTemplate from './hundreds/d/index.html';
import hundredsLevelDController from './hundreds/d/hundreds-controller.js';

import hundredsLevelETemplate from './hundreds/e/index.html';
import hundredsLevelEController from './hundreds/e/hundreds-controller.js';

import tensHundredsLevelCTemplate from './tens-hundreds/c/index.html';
import tensHundredsLevelCController from './tens-hundreds/c/tens-hundreds-controller.js';

import sketchLevelDTemplate from './sketch/d/index.html';
import sketchLevelDController from './sketch/d/sketch-controller.js';

import sketchLevelETemplate from './sketch/e/index.html';
import sketchLevelEController from './sketch/e/sketch-controller.js';

import sketchLevelFTemplate from './sketch/f/index.html';
import sketchLevelFController from './sketch/f/sketch-controller.js';

import thousandsLevelDTemplate from './thousands/d/index.html';
import thousandsLevelDController from './thousands/d/thousands-controller.js';

import thousandsLevelETemplate from './thousands/e/index.html';
import thousandsLevelEController from './thousands/e/thousands-controller.js';

import thousandsLevelFTemplate from './thousands/f/index.html';
import thousandsLevelFController from './thousands/f/thousands-controller.js';

import thousandsLevelGTemplate from './thousands/g/index.html';
import thousandsLevelGController from './thousands/g/thousands-controller.js';

import tensRegroupLevelDTemplate from './tens-regroup/d/index.html';
import tensRegroupLevelDController from './tens-regroup/d/tens-regroup-controller.js';

import tensRegroupLevelETemplate from './tens-regroup/e/index.html';
import tensRegroupLevelEController from './tens-regroup/e/tens-regroup-controller.js';

import hundredsRegroupLevelDTemplate from './hundreds-regroup/d/index.html';
import hundredsRegroupLevelDController from './hundreds-regroup/d/hundreds-regroup-controller.js';

import hundredsRegroupLevelETemplate from './hundreds-regroup/e/index.html';
import hundredsRegroupLevelEController from './hundreds-regroup/e/hundreds-regroup-controller.js';

import hundredsRegroupLevelFTemplate from './hundreds-regroup/f/index.html';
import hundredsRegroupLevelFController from './hundreds-regroup/f/hundreds-regroup-controller.js';

import thousandsRegroupLevelETemplate from './thousands-regroup/e/index.html';
import thousandsRegroupLevelEController from './thousands-regroup/e/thousands-regroup-controller.js';

import thousandsRegroupLevelFTemplate from './thousands-regroup/f/index.html';
import thousandsRegroupLevelFController from './thousands-regroup/f/thousands-regroup-controller.js';

import thousandsRegroupLevelGTemplate from './thousands-regroup/g/index.html';
import thousandsRegroupLevelGController from './thousands-regroup/g/thousands-regroup-controller.js';

import tensThousandsLevelFTemplate from './tens-thousands/f/index.html';
import tensThousandsLevelFController from './tens-thousands/f/tens-thousands-controller.js';

import tensThousandsLevelGTemplate from './tens-thousands/g/index.html';
import tensThousandsLevelGController from './tens-thousands/g/tens-thousands-controller.js';

import tenThousandsRegroupLevelFTemplate from './ten-thousands-regroup/f/index.html';
import tenThousandsRegroupLevelFController from './ten-thousands-regroup/f/ten-thousands-regroup-controller.js';

import tenThousandsRegroupLevelGTemplate from './ten-thousands-regroup/g/index.html';
import tenThousandsRegroupLevelGController from './ten-thousands-regroup/g/ten-thousands-regroup-controller.js';

import hundredThousandsLevelGTemplate from './hundred-thousands/g/index.html';
import hundredThousandsLevelGController from './hundred-thousands/g/hundred-thousands-controller.js';

import hundredThousandsRegroupLevelGTemplate from './hundred-thousands-regroup/g/index.html';
import hundredThousandsRegroupLevelGController from
  './hundred-thousands-regroup/g/hundred-thousands-regroup-controller.js';

import butterflyLevelBTemplate from './butterfly/b/index.html';
import butterflyLevelBController from './butterfly/b/butterfly-controller.js';

export default function subtractionRoutes($stateProvider) {
  'ngInject';

  //var assets = require('./images/asset.svg');

  $stateProvider
    .state('app.home.level.menu.subtraction', {
      url    : '/:category/subtraction',
      abstract: true
    })
    .state('app.home.level.menu.subtraction-game', {
        url   : '/:category/subtraction/:game',
        views : {
          'menu-page-view' : {
              template  : subtractionTemplate,
              controller: subtractionController
          },
          'circles.b@app.home.level.menu.subtraction-game'   : {
            template  : circlesLevelBTemplate,
            controller: circlesLevelBController,
            resolve: {
              'preload-beads': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'circles.c@app.home.level.menu.subtraction-game'   : {
            template  : circlesLevelCTemplate,
            controller: circlesLevelCController
          },
          'frog.b@app.home.level.menu.subtraction-game'   : {
            template  : frogLevelBTemplate,
            controller: frogLevelBController,
            resolve: {
              'preload-frog': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'frog.c@app.home.level.menu.subtraction-game'   : {
            template  : frogLevelCTemplate,
            controller: frogLevelCController
          },
          'frog.d@app.home.level.menu.subtraction-game'   : {
            template  : frogLevelDTemplate,
            controller: frogLevelDController
          },
          'plus-and-minus.b@app.home.level.menu.subtraction-game'   : {
            template  : plusAndMinusLevelBTemplate,
            controller: plusAndMinusLevelBController,
            resolve: {
              'preload-plus-and-minus': function (preLoaderService, $stateParams) {
                'ngInject';

                var state        = _.merge({}, this.self, {params: $stateParams || {}});
                var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

                return preLoaderService.loadImages(state, imageContext);
              }
            }
          },
          'plus-and-minus.c@app.home.level.menu.subtraction-game'   : {
            template  : plusAndMinusLevelCTemplate,
            controller: plusAndMinusLevelCController
          },
          'tens.c@app.home.level.menu.subtraction-game'   : {
            template  : tensLevelCTemplate,
            controller: tensLevelCController
          },
          'tens.d@app.home.level.menu.subtraction-game'   : {
            template  : tensLevelDTemplate,
            controller: tensLevelDController
          },
          'tens.e@app.home.level.menu.subtraction-game'   : {
            template  : tensLevelETemplate,
            controller: tensLevelEController
          },
          'hundreds.c@app.home.level.menu.subtraction-game'   : {
            template  : hundredsLevelCTemplate,
            controller: hundredsLevelCController
          },
          'hundreds.d@app.home.level.menu.subtraction-game'   : {
            template  : hundredsLevelDTemplate,
            controller: hundredsLevelDController
          },
          'hundreds.e@app.home.level.menu.subtraction-game'   : {
            template  : hundredsLevelETemplate,
            controller: hundredsLevelEController
          },
          'tens-hundreds.c@app.home.level.menu.subtraction-game'   : {
            template  : tensHundredsLevelCTemplate,
            controller: tensHundredsLevelCController
          },
          'sketch.d@app.home.level.menu.subtraction-game'   : {
            template  : sketchLevelDTemplate,
            controller: sketchLevelDController
          },
          'sketch.e@app.home.level.menu.subtraction-game'   : {
            template  : sketchLevelETemplate,
            controller: sketchLevelEController
          },
          'sketch.f@app.home.level.menu.subtraction-game'   : {
            template  : sketchLevelFTemplate,
            controller: sketchLevelFController
          },
          'thousands.d@app.home.level.menu.subtraction-game'   : {
            template  : thousandsLevelDTemplate,
            controller: thousandsLevelDController
          },
          'thousands.e@app.home.level.menu.subtraction-game'   : {
            template  : thousandsLevelETemplate,
            controller: thousandsLevelEController
          },
          'thousands.f@app.home.level.menu.subtraction-game'   : {
            template  : thousandsLevelFTemplate,
            controller: thousandsLevelFController
          },
          'thousands.g@app.home.level.menu.subtraction-game'   : {
            template  : thousandsLevelGTemplate,
            controller: thousandsLevelGController
          },
          'tens-regroup.d@app.home.level.menu.subtraction-game'   : {
            template  : tensRegroupLevelDTemplate,
            controller: tensRegroupLevelDController
          },
          'tens-regroup.e@app.home.level.menu.subtraction-game'   : {
            template  : tensRegroupLevelETemplate,
            controller: tensRegroupLevelEController
          },
          'hundreds-regroup.d@app.home.level.menu.subtraction-game'   : {
            template  : hundredsRegroupLevelDTemplate,
            controller: hundredsRegroupLevelDController
          },
          'hundreds-regroup.e@app.home.level.menu.subtraction-game'   : {
            template  : hundredsRegroupLevelETemplate,
            controller: hundredsRegroupLevelEController
          },
          'hundreds-regroup.f@app.home.level.menu.subtraction-game'   : {
            template  : hundredsRegroupLevelFTemplate,
            controller: hundredsRegroupLevelFController
          },
          'thousands-regroup.e@app.home.level.menu.subtraction-game'   : {
            template  : thousandsRegroupLevelETemplate,
            controller: thousandsRegroupLevelEController
          },
          'thousands-regroup.f@app.home.level.menu.subtraction-game'   : {
            template  : thousandsRegroupLevelFTemplate,
            controller: thousandsRegroupLevelFController
          },
          'thousands-regroup.g@app.home.level.menu.subtraction-game'   : {
            template  : thousandsRegroupLevelGTemplate,
            controller: thousandsRegroupLevelGController
          },
          'tens-thousands.f@app.home.level.menu.subtraction-game'   : {
            template  : tensThousandsLevelFTemplate,
            controller: tensThousandsLevelFController
          },
          'tens-thousands.g@app.home.level.menu.subtraction-game'   : {
            template  : tensThousandsLevelGTemplate,
            controller: tensThousandsLevelGController
          },
          'ten-thousands-regroup.f@app.home.level.menu.subtraction-game'   : {
            template  : tenThousandsRegroupLevelFTemplate,
            controller: tenThousandsRegroupLevelFController
          },
          'ten-thousands-regroup.g@app.home.level.menu.subtraction-game'   : {
            template  : tenThousandsRegroupLevelGTemplate,
            controller: tenThousandsRegroupLevelGController
          },
          'hundred-thousands.g@app.home.level.menu.subtraction-game'   : {
            template  : hundredThousandsLevelGTemplate,
            controller: hundredThousandsLevelGController
          },
          'hundred-thousands-regroup.g@app.home.level.menu.subtraction-game'   : {
            template  : hundredThousandsRegroupLevelGTemplate,
            controller: hundredThousandsRegroupLevelGController
          },
          'butterfly.b@app.home.level.menu.subtraction-game'   : {
            template  : butterflyLevelBTemplate,
            controller: butterflyLevelBController,
            resolve: {
              'preload-subtraction-butterfly': function (preLoaderService, $stateParams) {
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