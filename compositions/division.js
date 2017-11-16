
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.division';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/division/division-routes'));

export default moduleName;
