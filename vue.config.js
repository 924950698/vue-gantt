const axios = require('axios');

axios.defaults.baseURL = '/api'

module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true,
    },
  },
  configureWebpack: {
    devServer: {
        proxy: {
          "/api": {
            target: "http://127.0.0.1:7001", // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
            changeOrigin: true, // 允许跨域
            ws: true,
            secure: false, // 使用的是http协议则设置为false，https协议则设置为true
            pathRewrite: {
              "^/api": "",
            },
          },
        },
        host: '0.0.0.0',
        port: '7001',
      },
  },
  transpileDependencies: [/[\\\/]node_modules[\\\/]quasar[\\\/]/],
};
