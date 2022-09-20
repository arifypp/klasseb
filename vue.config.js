const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  lintOnSave:false,
  devServer: {
    compress: true,
    disableHostCheck: true,
  },
})
