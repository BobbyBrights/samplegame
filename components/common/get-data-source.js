/**

 * A small service to get the json data-graphs for the game
 *
 * @param $http
 * @param $q
 * @returns {{getGameData: getGameData}}
 * @constructor
 */
function GetDataSource($http, $q) {
  var deferred = $q.defer();
  return {
    getGameData: function (url) {
      $http.get(url)
        .success(function (data) {
          deferred.resolve(data);
        })
        .error(function (data, status) {
          var rejectMessage = 'Error::rainforest.dataSource: Request failed with status ' + status +
            '  url = ' + url;
          console.error(rejectMessage);
          deferred.reject(rejectMessage);
        });

      return deferred.promise;
    }
  };
}
module.exports = /*@ngInject*/ GetDataSource;