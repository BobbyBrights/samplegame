
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.two-d-shapes';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/two-d-shapes/two-d-shapes-routes'));

export default moduleName;
