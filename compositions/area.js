
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.area';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/area/area-routes'));

export default moduleName;
