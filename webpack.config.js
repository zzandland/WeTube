const path = require('path');

module.exports = {
  entry: [path.join(__dirname, '/client/index.jsx')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '/public/dist'),
  },
  resolve: {
    extensions: ['.jsx', '.js'],
  },
  devtool: 'cheat-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};
