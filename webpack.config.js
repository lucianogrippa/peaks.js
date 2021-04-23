const path = require('path');
const { env } = require('process');


console.log("env.NODE_ENV is " + env.NODE_ENV);


let  mode = !!env.NODE_ENV ? env.NODE_ENV.trim(): 'development';

const devMode = mode === 'development';

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
};
