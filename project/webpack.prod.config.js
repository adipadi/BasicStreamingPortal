const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: [
    path.resolve(__dirname, 'src/client/Router.jsx')],
  output: {
    path: path.resolve(__dirname, 'public/cms/javascripts'),
    filename: 'bundle.js',
    publicPath: 'cms/javascripts/'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loaders: ['eslint'],
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'lib')
        ]
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: [/bower_components/, /node_modules/],
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /\.svg$/,
        loader: 'svg-inline'
      }
    ]
  },

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

  resolve: {
    alias: {
      react: 'node_modules/react/dist/react.min.js'
    }
  },
  resolve: {
    alias: {
      actions: path.resolve(__dirname, 'src/client/common/actions/index.js'),
      'ajax/request': path.resolve(__dirname, 'lib/ajax/request.js'),
      components: path.resolve(__dirname, 'src/client/common/components/index.js'),
      validation: path.resolve(__dirname, 'lib/validation'),
      'ajax': path.resolve(__dirname, 'lib/ajax/index.js'),
      images: path.resolve(__dirname, 'src/images'),
      lib: path.resolve(__dirname, 'lib'),
      renderers: path.resolve(__dirname, 'src/client/common/components/renderers/index.js'),
      constants: path.resolve(__dirname, 'src/constants.js')
    },
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    })
  ],
};
