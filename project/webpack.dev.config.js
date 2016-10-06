'use strict';

const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/client/Router')
  ],
  output: {
    path: path.resolve(__dirname, ''),
    filename: 'bundle.js',
    publicPath: '/javascripts/'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/bower_components/, /node_modules/, /glyphicons/],
        loader: 'babel',
        query: {
          presets: ['react-hmre', 'react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      },
      { include: /\.json$/, loaders: ['json-loader'] }
    ]
  },

  eslint: {
    failOnError: true,
    failOnWarning: false,
  },

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/client/common/actions/index.js'),
      'ajax/request': path.resolve(__dirname, 'lib/ajax/request.js'),
      validation: path.resolve(__dirname, 'lib/validation'),
      ajax: path.resolve(__dirname, 'lib/ajax/index.js'),
      components: path.resolve(__dirname, 'src/client/common/components/index.js'),
      images: path.resolve(__dirname, 'src/images'),
      lib: path.resolve(__dirname, 'lib'),
      renderers: path.resolve(__dirname, 'src/client/common/components/renderers/index.js'),
      constants: path.resolve(__dirname, 'src/constants.js')
    },
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    // Disabled - it will fail the build even for ESLint warnings
    // new webpack.NoErrorsPlugin()
  ],

  devServer: {
    hot: true,
    proxy: {
    '/api/*': {
      target: 'http://sumo.tv2.no',
      secure: false,
    },
      '*': `http://127.0.0.1:${process.env.PORT || 3080}`
    },
    publicPath: '/javascripts/'
  }
};
