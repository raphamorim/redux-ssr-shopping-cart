const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const production = process.env.NODE_ENV === 'production'

const loaders = production ? [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: false
  })
] : []

module.exports = [{
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'server.js',
    publicPath: '/'
  },
  target: 'node',
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true
  },
  externals: nodeExternals(),
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel'
    }]
  }
}, {
  entry: './src/app/index.js',
  output: {
    path: './dist/assets',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: loaders,
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}]