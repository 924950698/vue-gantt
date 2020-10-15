const axios = require('axios');

axios.defaults.baseURL = '/api'
console.log('123')

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
            target: "http://jira.dev.aixuexi.com", // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
            changeOrigin: true, // 允许跨域
            ws: true,
            secure: false, // 使用的是http协议则设置为false，https协议则设置为true
            pathRewrite: {
              "^/api": "",
            },
          },
        },
        host: '0.0.0.0',
        port: '8080',
      },
  },
  transpileDependencies: [/[\\\/]node_modules[\\\/]quasar[\\\/]/],
};
