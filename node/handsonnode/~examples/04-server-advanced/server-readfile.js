// Requires
var httpUtil = require('http')
var fsUtil = require('fs')
var pathUtil = require('path')
var urlUtil = require('url')
var config = require('./config')

// Server
httpUtil.createServer(function (req, res) {
	var file = urlUtil.parse(req.url).pathname
	var path = pathUtil.join(config.staticPath, file)
	fsUtil.exists(path, function (exists) {
		if ( !exists ) {
			res.statusCode = 404
			return res.end('404 File Not Found')
		}
		fsUtil.readFile(path, function (error, data) {
			if ( error ) {
				console.log('Warning:', error.stack)
				res.statusCode = 500
				return res.end('500 Internal Server Error')
			}
			return res.end(data)
		})
	})
}).listen(8000)
