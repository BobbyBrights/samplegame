
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.time';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/time/time-routes'));

export default moduleName;
