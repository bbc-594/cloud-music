const CompressionWebpackPlugin = require("compression-webpack-plugin")
const productionGzipExtensions = ["js", "css"]
module.exports = {
  productionSourceMap: false,
  publicPath: "./",
  configureWebpack: (config) => {
    config.externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      axios: "axios",
    }
    config.plugins.push(
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8,
      })
    )
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            chunks: "all",
            test: /node_modules/,
            name: "vendor",
            minChunks: 1,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 100,
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60,
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true,
          },
          runtimeChunk: {
            name: "manifest",
          },
        },
      },
    }
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#df3b3b",
          "link-color": "#df3b3b",
        },
        javascriptEnabled: true,
        importLoaders: 1,
      },
      css: {
        importLoaders: 1,
      },
    },
  },
  chainWebpack: (config) => {
    config.plugins.delete("prefetch")
  },
  devServer: {
    proxy: {
      "/api": {
        // target: "localhost:3000",
        target: "http://localhost:3000",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
}
