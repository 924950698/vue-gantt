module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  },
  // devServer: {
  //     proxy: {
  //         '/api': {
  //               // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
  //             target: 'http://jira.dev.aixuexi.com',
  //               // 允许跨域
  //             changeOrigin: true,
  //             ws: true,
  //             pathRewrite: {
  //                   '^/api': ''
  //             }
  //         }
  //     }
  // },
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
