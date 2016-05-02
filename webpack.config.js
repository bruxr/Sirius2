var webpack = require('webpack');
var BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');

module.exports = {
  debug: true,
  entry: {
    main: './sirius/assets/javascripts/main'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: { presets: ['es2015', 'react'] }
      }
    ]
  },
  plugins: [
      new webpack.ContextReplacementPlugin(/moment[\\\/]lang$/, /^\.\/(en-gb)$/),
      new BellOnBundlerErrorPlugin()
  ],
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/assets'
  }
}