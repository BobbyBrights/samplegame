
import angular from 'angular';
import angularUIRouter from 'angular-ui-router';

var moduleName = 'app.games.share-cicadas';

angular
  .module(moduleName, [
    angularUIRouter
  ])
  .config(require('../components/share-cicadas/share-cicadas-routes'));

export default moduleName;
