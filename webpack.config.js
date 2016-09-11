var path = require('path');
var srcPath = path.join(__dirname, 'public/js/src');
var buildPath = path.join(__dirname, 'public/js/dist');

module.exports = {
  context: srcPath,
  entry: path.join(srcPath, 'client.js'),
  output: {
      path: buildPath,
      filename: "bundle.js"
  },
  module: {
      loaders: [
          {
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel',
            query: {
              presets: ['react', 'es2015']
            }
          }
      ]
  }
};
