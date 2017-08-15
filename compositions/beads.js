
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.beads';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/beads/beads-routes'));

export default moduleName;
