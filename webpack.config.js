const path = require('path');
const exec = require('child_process').exec;

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
  plugins: [
    {
      apply: compiler => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
          exec('./exposeFunctions.sh', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      },
    },
  ],
  optimization: {
    minimize: false,
  },
  mode: 'development',
};
