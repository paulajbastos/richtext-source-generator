import webpack from 'webpack';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackInlineSourcePlugin from 'html-webpack-inline-source-plugin';
import baseConfig from './base';

const config = {
  ...baseConfig,
  plugins: [
    ...baseConfig.plugins,
    // new MiniCssExtractPlugin({ filename: 'bundle.css' }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      inlineSource: '.(js|css)$'
    }),
    new HtmlWebpackInlineSourcePlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      uglifyOptions: {
        // compress: false,
        // ecma: 6,
        // mangle: true
      },
      sourceMap: true
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['css-loader', 'postcss-loader', 'sass-loader']
      },
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
      }),
    ],
  },
};

export default config;
