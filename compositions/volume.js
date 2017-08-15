
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.volume';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/volume/volume-routes'));

export default moduleName;
