
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.chance-probability';

angular
  .module(moduleName, [
    angularUIRouter
  ])

  .config(require('../components/chance-probability/chance-probability-routes'));


export default moduleName;
