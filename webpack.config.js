const path = require('path');

module.exports = {
  entry: './Contents/Scripts/index.js',
  output: {
    path: path.resolve(__dirname, './Contents/Scripts/'),
    filename: 'main.js',
    libraryTarget: 'var',
    library: 'prettierify',
  },
  module: {
    rules: [
      {
        test: '/.js$/',
        loader: 'babel-loader',
      },
    ],
  },
  optimization: {
    minimize: false,
  },
  mode: 'development',
};
