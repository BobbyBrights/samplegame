
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.data-graphs';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/data-graphs/data-graphs-routes'));

export default moduleName;
