const path = require("path")
module.exports = {
  publicPath: "/",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    historyApiFallback: {
      index: "/index.html",
      //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
    },
    proxy: {
      "/v1": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
}
