const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const PUBLIC_PATH = IS_PRODUCTION
  ? process.env.PUBLIC_PATH ||
    'https://tryinteract-dashboards-dev.s3-us-west-1.amazonaws.com/dashboard/'
  : 'http://localhost:9011/';

const config = {
  entry: IS_PRODUCTION
    ? './index.js'
    : ['react-hot-loader/patch', './index_hot.js'],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          compress: {
            unused: false,
            computed_props: false,
            properties: false,
            join_vars: false,
            typeofs: false,
          },
          output: {
            comments: false,
            beautify: false,
            wrap_func_args: false,
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: PUBLIC_PATH,
    filename: '[name].js',
  },
  context: path.join(__dirname, 'src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude:
          /node_modules\/(?!(email-validator|query-string|strict-uri-encode))/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
        },
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          {
            loader: !IS_PRODUCTION
              ? 'style-loader'
              : MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: !IS_PRODUCTION,
              modules: {
                localIdentName: '[name]_[local]_[hash:base64:5]',
                exportLocalsConvention: 'camelCase',
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !IS_PRODUCTION,
              sassOptions: {
                includePaths: [
                  path.resolve(__dirname, '../node_modules'), // for the reset
                  path.resolve(__dirname, '../src/scss'), // for other imports in scss folder
                ],
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.ejs',
      hash: false,
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: IS_PRODUCTION ? '[name].css' : '[name].[hash].css',
      chunkFilename: IS_PRODUCTION ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.EnvironmentPlugin({
      QUIZ_PREVIEW: 'quiz.tryinteract.io',
      POLL_PREVIEW: 'poll.tryinteract.com',
      GIVEAWAY_PREVIEW: 'giveaway.tryinteract.com',
      POLLS_GIVEAWAYS_DISABLE_DATE: '2022-03-10T15:25:37.120Z',
      BLOCK_PUBLISH_FOR_TRIAL_USERS: true,
      FEAT_QUIZ_ANALYTICS: true,
      INTERACT_AI_URL: 'https://ai.tryinteract.dev',
      INTERACT_DASHBOARD_NEXT_API_URL: 'https://dashboard-next.tryinteract.dev',
    }),
  ],
};

if (!IS_PRODUCTION) {
  config.devServer = {
    hot: true,
    port: 9011,
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api': 'http://localhost:9010/',
      '/user': 'http://localhost:9010/',
      '/company': 'http://localhost:9010/',
    },
  };
}

module.exports = config;
