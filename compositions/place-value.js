
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.place-value';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/place-value/place-value-routes'));

export default moduleName;
