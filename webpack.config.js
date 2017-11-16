
var angularity            = require('webpack-angularity-solution');
var webpackNotifierPlugin = require('webpack-notifier');
var opener                = require('opener-for-webpack');
var dataJsonOptimizer     = require('data-json-optimizer');
var webpack               = require('webpack');

const PORT = '4000'; //56853,
GLOBALS    = {
  '$'            : 'jquery',
  'jQuery'       : 'jquery',
  'window.jQuery': 'jquery'
};

module.exports = angularity(process.env, {globals: GLOBALS, port: PORT, unminified: true})
  .define('common')
  .append(amendJsonLoader)
  .define('common')
  .append(amendXMLLoader)

  .append(openTheApp)
  .append(addDataJsonOptimizer)
  .append(notify)
  .include(process.env.MODE || 'app')
  .otherwise('app+test')
  .resolve();

function amendJsonLoader(configurator, options) {
  return configurator
    .loader('json', {
      test  : /\.json$/,
      loader: "url?name=assets/[name]-[hash].[ext]&mimetype=application/json"
    });
}


function amendXMLLoader(configurator, options) {
  return configurator
    .loader('xml', {
      test  : /\.xml$/,
      loader: "url?name=assets/[name]-[hash].[ext]&mimetype=application/xml"
    });

}

function openTheApp(configurator, options) {
  var url = 'http://localhost' + (options.port ? ':' + options.port : '');
  return configurator
    .plugin('opener-for-webpack', opener, [{url: url}]);
}

function notify(configurator, options) {
  return configurator
    .plugin('webpack-notifier', webpackNotifierPlugin, [{
      title          : 'RainForest',
      // contentImage: path.join(__dirname, 'src/assets/logo.png'),
      alwaysNotify   : true,
      excludeWarnings: false
    }]);
}

function addDataJsonOptimizer(configurator, options) {
  return configurator
    .merge({
        plugins: [
          //new dataJsonOptimizer(),
          new webpack.WatchIgnorePlugin([/game-data.*\.json$/])
        ]
      }
    );
}
