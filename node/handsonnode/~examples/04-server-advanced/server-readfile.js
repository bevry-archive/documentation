// Requires
var httpUtil = require('http')
var fsUtil = require('fs')
var pathUtil = require('path')

// Configuration
var appConfig = {
	staticPath:  __dirname
}

// Server
httpUtil.createServer(function (req, res) {
	var path = pathUtil.join(appConfig.staticPath, req.url)
	fsUtil.readFile(req.url, function (error, data) {
		if ( error ) {
			console.log('Warning:', error.stack)
			res.statusCode = 400
			return res.end('400 Bad Request')
		}
		else {
			return res.end(data)
		}
	})
}).listen(8000, '127.0.0.1')
