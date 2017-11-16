
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.more-count';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/more-count/more-count-routes'));

export default moduleName;
