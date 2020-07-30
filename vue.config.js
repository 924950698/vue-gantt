module.exports = {
  // devServer: {
  //   open: true,

  //   proxy: {
  //       '/rest': {
  //             // 此处的写法，目的是为了 将 /api 替换成 http://jira.dev.aixuexi.com
  //           target: 'https://39.106.60.3:8080',
  //             // 允许跨域
  //           changeOrigin: true,
  //           ws: true,
  //           pathRewrite: {
  //                 '^/rest': ''
  //           }
  //       }
  //   }
  // },
  pluginOptions: {
    quasar: {
      treeShake: true
    }
  }, 
  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar[\\\/]/
  ]
}
