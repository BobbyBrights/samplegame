export default  function splashController($scope, $state, $timeout) {
  'ngInject';

  $scope.level = $state.params.level;

  $timeout(function () {
    $state.go('app.home.level.menu', {level: $scope.level});
  }, 500);

}