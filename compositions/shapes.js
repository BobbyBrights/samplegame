
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.shapes';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/shapes/shapes-routes'));

export default moduleName;
