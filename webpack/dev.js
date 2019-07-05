import path from 'path';
import webpack from 'webpack';
import baseConfig from './base';

const config = {
  ...baseConfig,
   entry: [
    'webpack-dev-server/client?http://localhost:3000/#/',
    ...baseConfig.entry
  ],
  
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],

  devtool: '#inline-source-map',
  devServer: {
    // contentBase: './',
    //quiet: true,
    https: true,
    hot: true,
    port: '3000',
    inline: true,
    // historyApiFallback: true,
  }
};

export default config;
