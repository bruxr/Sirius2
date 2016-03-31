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
  devtool: 'source-map',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/public/assets'
  }
}