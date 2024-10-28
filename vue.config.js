require = require("esm")(module);
const { routes } = require("./src/routes.js");
const { urls } = require("./src/urls.js");
const moment = require("moment-mini");
const zlib = require("zlib");

function dateNowFormat(value) {
  return moment.utc(value).format(process.env.VUE_APP_DATEFORMAT);
}

module.exports = {
  devServer: {
    host: "firestarters-local.cxahub.com",
    port: 8080,
  },
  publicPath: process.env.APP_BASE_PATH,
  transpileDependencies: ["vue-meta"],
  pluginOptions: {
    compression: {
      brotli: {
        filename: "[file].br[query]",
        algorithm: "brotliCompress",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: 11,
          },
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: "[file].gz[query]",
        algorithm: "gzip",
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        minRatio: 0.8,
      },
    },
    sitemap: {
      productionOnly: true,
      baseURL: "https://firestarters.cxahub.com",
      outputDir: "./public",
      pretty: true,
      routes,
      urls: (async () => {
        return await urls;
      })(),
      defaults: {
        lastmod: dateNowFormat(Date.now()),
        changefreq: "weekly",
        priority: 1.0,
      },
    },
  },
};
