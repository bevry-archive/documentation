'use strict'

// Requires
const httpUtil = require('http')
const serveStatic = require('./serve-static')
const config = require('./config')

// Server
httpUtil.createServer(function (req, res) {
	serveStatic(config.staticPath, req, res, function () {
		res.statusCode = 404
		res.end('404 Not Found. 🙁 \n')
	})
}).listen(8000)
