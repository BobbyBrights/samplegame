import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.multiplication';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/multiplication/multiplication-routes'));

export default moduleName;
