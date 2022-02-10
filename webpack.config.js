const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    globalObject: 'this',
    path: path.resolve(__dirname, 'dist'),
    filename: 'magicrest.js',
    library: {
      name: 'magicrest',
      type: 'umd',
    },
  },
  externals: {
    axios: {
      commonjs: 'axios',
      commonjs2: 'axios',
      amd: 'axios',
      root: '_',
    },
  },
};
