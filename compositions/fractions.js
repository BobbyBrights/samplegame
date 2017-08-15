import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.fractions';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/fractions/fractions-routes'));

export default moduleName;

