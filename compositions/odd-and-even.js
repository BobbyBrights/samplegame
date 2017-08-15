import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.odd-and-evens';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/odd-and-evens/odd-and-evens-routes'));

export default moduleName;
