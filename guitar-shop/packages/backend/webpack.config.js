const { composePlugins, withNx } = require('@nrwl/webpack');
const ShebangPlugin = require('webpack-shebang-plugin');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  config.plugins.push(new ShebangPlugin());
  return config;
});
