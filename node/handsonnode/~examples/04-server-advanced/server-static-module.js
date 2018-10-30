'use strict'

// Requires
const httpUtil = require('http')
const serveStatic = require('./serve-static')
const config = require('./config')

// Server
httpUtil.createServer(function (req, res) {
	serveStatic(config.staticPath, req, res)
}).listen(8000)

// Can even do this, due to the simplicity
// httpUtil.createServer(
// 	serveStatic.bind(null, config.staticPath)
// ).listen(8000)

// @TODO
// Why does the bind solution work?
