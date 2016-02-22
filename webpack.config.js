var ExtractTextPlugin = require('extract-text-webpack-plugin');

var sassLoader = [
  'css?modules&importLoaders=2&sourceMap&localIdentName=HVAC--[name]--[local]__[hash:base64:5]',
  'postcss?browsers=last 2 version',
  'sass'
];

module.exports = {
  devtool: 'inline-source-map',

  entry: __dirname + '/lib/index.js',

  output: {
    path: __dirname + '/js',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', sassLoader)
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};
