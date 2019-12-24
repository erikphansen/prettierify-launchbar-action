const path = require('path')
const exec = require('child_process').exec

module.exports = {
  entry: './src/json.js',
  output: {
    path: path.resolve(
      __dirname,
      './build/Prettierify-JSON.lbaction/Contents/Scripts/',
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
          exec('./src/exposeFunctionsJSON.sh', (err, stdout, stderr) => {
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
