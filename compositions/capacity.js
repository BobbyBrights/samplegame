
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.capacity';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/capacity/capacity-routes'));

export default moduleName;
