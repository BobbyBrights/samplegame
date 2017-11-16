require('./index.scss');

import timeTemplate from './index.html';
import timeController from './time-controller.js';

import wordTemplate from './drag-type/a/word/index.html';
import wordController from './drag-type/a/word/drag-type-controller.js';

import weekTemplate from './drag-type/a/week/index.html';
import weekController from './drag-type/a/week/drag-type-controller.js';

import monthLevelBTemplate from './drag-type/b/month/index.html';
import monthLevelBController from './drag-type/b/month/drag-type-controller.js';

import clockTemplate from './input-type/a/clock/index.html';
import clockController from './input-type/a/clock/input-type-controller.js';

import clockLevelBTemplate from './input-type/b/clock/index.html';
import clockLevelBController from './input-type/b/clock/input-type-controller.js';

import calendarLevelBTemplate from './input-type/b/calendar/index.html';
import calendarLevelBController from './input-type/b/calendar/input-type-controller.js';

import halfClockLevelBTemplate from './input-type/b/half-clock/index.html';
import halfClockLevelBController from './input-type/b/half-clock/input-type-controller.js';

export default function timeRoutes($stateProvider) {
  'ngInject';

  $stateProvider
    .state('app.home.level.menu.time', {
      url     : '/:category/time',
      abstract: true
    })
    .state('app.home.level.menu.time-game', {
      url  : '/:category/time/:game',
      views: {
        'menu-page-view'                            : {
          template  : timeTemplate,
          controller: timeController
        },
        'word.a@app.home.level.menu.time-game'      : {
          template  : wordTemplate,
          controller: wordController,
          resolve   : {
            'preload-word.a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'week.a@app.home.level.menu.time-game'      : {
          template  : weekTemplate,
          controller: weekController,
          resolve   : {
            'preload-week.a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'clock.a@app.home.level.menu.time-game'     : {
          template  : clockTemplate,
          controller: clockController,
          resolve   : {
            'preload-clock.a': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'clock.b@app.home.level.menu.time-game'     : {
          template  : clockLevelBTemplate,
          controller: clockLevelBController,
          resolve   : {
            'preload-clock.b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'month.b@app.home.level.menu.time-game'     : {
          template  : monthLevelBTemplate,
          controller: monthLevelBController,
          resolve   : {
            'preload-month.b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'calendar.b@app.home.level.menu.time-game'  : {
          template  : calendarLevelBTemplate,
          controller: calendarLevelBController,
          resolve   : {
            'preload-calendar.b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
        'half-clock.b@app.home.level.menu.time-game': {
          template  : halfClockLevelBTemplate,
          controller: halfClockLevelBController,
          resolve   : {
            'preload-half-clock.b': function (preLoaderService, $stateParams) {
              'ngInject';

              var state        = _.merge({}, this.self, {params: $stateParams || {}});
              var imageContext = require.context('./', true, /.*\.(svg|jpg)$/);

              return preLoaderService.loadImages(state, imageContext);
            }
          }
        },
      },

    });
}
