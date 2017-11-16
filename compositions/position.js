
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.position';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/position/position-routes'));

export default moduleName;