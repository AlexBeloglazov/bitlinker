const path = require('path');

const config = {
  entry: {
    app: './src/lib/app.js',
    background: './src/lib/background.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {test: /\.js$/, use: 'babel-loader'}
    ]
  }
};

module.exports = config;