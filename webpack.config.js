const path = require('path');
const { env } = require('process');


console.log("env.NODE_ENV is " + env.NODE_ENV);


let  mode = !!env.NODE_ENV ? env.NODE_ENV.trim(): 'development';

const devMode = mode === 'development';
const LiveReloadPlugin = require('webpack-livereload-plugin');

console.log("mode is ",mode," sourcemap ",devMode);
console.log(mode);
module.exports = {
  entry: './src/main.js',
  mode: mode,
  devtool: devMode ? 'source-map' : false,
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'peaks.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new LiveReloadPlugin()
  ] 
};
