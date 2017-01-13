const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

const productionEnv = process.env.NODE_ENV === 'production'

let plugins = productionEnv ? [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
] : []

const clientLoaders = productionEnv ? plugins.concat([
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    sourceMap: false
  })
]) : []

module.exports = [{
    entry: './src/server.js',
    output: {
      path: './dist',
      filename: 'server.js',
      libraryTarget: 'commonjs2',
      publicPath: '/'
    },
    target: 'node',
    node: {
      console: false,
      global: false,
      process: false,
      Buffer: false,
      __filename: false,
      __dirname: false
    },
    externals: nodeExternals(),
    plugins: plugins,
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
  plugins: clientLoaders.concat([
    new ExtractTextPlugin('index.css', {
      allChunks: true
    })
  ]),
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel'
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('css!sass')
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  }
}]