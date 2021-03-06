const injectClientSpecifics = require('../inject.client-specifics')
const injectHotUpdate = require('../inject.hot-update')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const injectHtml = require('../inject.html')

module.exports = function (chain, cfg) {
  if (cfg.ctx.mode.ssr && cfg.ctx.mode.pwa) {
    injectHtml(chain, cfg)
  }

  injectClientSpecifics(chain, cfg)
  injectHotUpdate(chain, cfg)

  chain.plugin('vue-ssr-client')
    .use(VueSSRClientPlugin, [{
      filename: '../quasar.client-manifest.json'
    }])
}
