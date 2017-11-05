var express = require('express')
var config = require('./config/index')

var port = process.env.PORT || config.build.port

var app = express()

var router = express.Router()

router.get('/', function (req, res, next) {
  14
  req.url = '/index.html'
  next()
})
app.use(router)
//异步接口

var mafengData = require('./data.json')

var ex = mafengData[0].data.ex

var list = mafengData[0].data.list

var themeEx = mafengData[1].data.ex

var themeList = mafengData[1].data.list

var data = mafengData[2]

var apiRouter = express.Router()

app.use('/api', apiRouter)

apiRouter.get('/ex', function (req, res) {
  res.json({
    error: 0,
    data: ex
  })
})

apiRouter.get('/list', function (req, res) {
  res.json({
    error: 0,
    data: list
  })
})

apiRouter.get('/themeEx', function (req, res) {
  res.json({
    error: 0,
    data: themeEx
  })
})

apiRouter.get('/themeList', function (req, res) {
  res.json({
    error: 0,
    data: themeList
  })
})

apiRouter.get('/data', function (req, res) {
  res.json({
    error: 0,
    data: data
  })
})

//定义express静态目录
app.use(express.static('./dist'))
var autoOpenBrowser = !!config.dev.autoOpenBrowser
var uri = 'http://localhost:' + port
var opn = require('opn')
//启动express
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
