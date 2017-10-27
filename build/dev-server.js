require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var data = require('../data/data.json')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()

apiRoutes.post('/getprojectlistBydistrict', function (req, res) {
  let datalist = {
    data: data
  }
  res.send(datalist)
})

apiRoutes.get('/getwuye', function (req, res) {
  let datalist = {
    data: ['商铺', '商办公寓', '商铺', '住宅', '商铺', '别墅', '商铺', '商铺', '商办公寓', '商铺', '住宅', '商铺', '别墅', '商铺']
  }
  res.send(datalist)
})

apiRoutes.get('/getDianyong', function (req, res) {
  let datalist = {
    data: data
  }
  res.send(datalist)
})

apiRoutes.get('/getProvincelist', function (req, res) {
  let datalist = {
    data: ["浙江省", "江苏省", "上海市"]
  }
  res.send(datalist)
})

apiRoutes.post('/getCitylist', function (req, res) {
  let datalist = {
    data: ["苏州市", "南通市", "无锡市"]
  }
  res.send(datalist)
})

apiRoutes.post('/getDistirctlist', function (req, res) {
  let datalist = {
    data: ["通州", "如皋", "海安", "如东", "海门", "通州", "如皋", "海安", "如东", "海门"]
  }
  res.send(datalist)
})


app.use('/pro', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {},
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
