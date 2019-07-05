import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
// import HTMLInlineCSSWebpackPlugin from 'html-inline-css-webpack-plugin';

let isDevMode = 'production' !== process.env.NODE_ENV;

console.log('Development mode:', isDevMode);
console.log('NODE_ENV:', process.env.NODE_ENV);

const config = {
  entry: [
    path.join(__dirname, '../', 'src', 'js', 'main'),
  ],

  // output: {
  //   path: path.join(__dirname, '../', 'dist'),
  //   filename: 'bundle.js',
  // },

  resolve: {
    extensions: ['.js', '.scss', '.sass', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        exclude: [/node_modules/, /src\/styles$/],
        use: [{
          loader: 'babel-loader',
          query: {
            plugins: [
              // Sem o AMD para usar widgets padrão OCC
              ['@babel/plugin-transform-modules-amd'],
              // ['@babel/plugin-transform-modules-commonjs', {loose: true, noInterop: true}],
              // ['@babel/plugin-proposal-class-properties']
            ],
            presets: ['@babel/preset-env']
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
};

export default { ...config };
