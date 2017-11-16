
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.rounding-to';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/rounding-to/rounding-to-routes'));

export default moduleName;
