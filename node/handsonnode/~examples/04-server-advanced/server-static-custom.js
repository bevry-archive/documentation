// Requires
var httpUtil = require('http')
var serveStatic = require('./serve-static')
var config = require('./config')

// Server
httpUtil.createServer(function (req, res) {
	serveStatic(config.staticPath, req, res, function () {
		res.statusCode = 404
		res.end('404 Not Found. 🙁 \n')
	})
}).listen(8000)
