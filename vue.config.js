
const path = require('path');
function resolve(p) {
  return path.join(__dirname, p);
}
const webpack = require('webpack')

module.exports = {
  productionSourceMap : false,
  devServer: {
    port : 8099,
    proxy: {
      '/data': {
        target: 'http://work789.com/data',
        // target: 'http://127.0.0.1:7001/data',
        changOrigin: true,
        pathRewrite: {
          '^/data': ''
        }
      },
    }
  },
  configureWebpack: config => {
    const plugins = [];
    plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    );
    config.plugins = [...config.plugins, ...plugins];
  },
  publicPath :'./',
  outputDir :'app',
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
          },
          javascriptEnabled: true,
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@components', resolve('src/components'))
      .set('@', resolve('src'));
  }
};