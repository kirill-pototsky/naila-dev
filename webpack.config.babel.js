import webpack from 'webpack';
import path from 'path';
import { IS_DEBUG, JS_ENTRY, JS_OUTPUT } from './gulpfile.babel.js/tasks/config';

export default {
  entry: path.resolve(JS_ENTRY),
  output: {
    filename: 'app.min.js',
    path: path.resolve(JS_OUTPUT),
  },
  watch: IS_DEBUG,
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
};
