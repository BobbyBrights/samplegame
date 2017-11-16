/**
 * Created by Rushali on 21-10-2016.
 */

import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.twos-patterns';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/twos-patterns/twos-patterns-routes'));

export default moduleName;
