
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.mass';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/mass/mass-routes'));

export default moduleName;
