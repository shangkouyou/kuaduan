
const path = require('path');
function resolve(p) {
  return path.join(__dirname, p);
}

module.exports = {
  devServer: {
    port : 8099,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001/api',
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
    }
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