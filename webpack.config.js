const path = require('path')
const exec = require('child_process').exec

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(
      __dirname,
      './build/Prettierify.lbaction/Contents/Scripts/',
    ),
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
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', () => {
          exec('./src/exposeFunctions.sh', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout)
            if (stderr) process.stderr.write(stderr)
          })
        })
      },
    },
  ],
  optimization: {
    minimize: false,
  },
  mode: 'development',
}
