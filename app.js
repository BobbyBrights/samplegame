import angular from 'angular';
import ngSanitize from 'angular-sanitize';
import angularUIRouter from 'angular-ui-router';

import common from './compositions/common.js';


import home from './compositions/home.js';
import games from './compositions/games.js';

export default  angular
  .module('app', [
    ngSanitize,
    angularUIRouter,
    common,
    home,
    games

  ]).run(function () {
    'ngInject';
  });
