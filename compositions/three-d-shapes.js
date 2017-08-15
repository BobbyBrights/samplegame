
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.three-d-shapes';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/three-d-shapes/three-d-shapes-routes'));

export default moduleName;
