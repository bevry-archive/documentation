// Requires
var httpUtil = require('http')
var fsUtil = require('fs')
var pathUtil = require('path')
var urlUtil = require('url')
var config = require('./config')

// @TODO
// This is getting a bit big, how can we refactor this?
// Can we abstract it out?
// What considerations do we need to take into account?
// How would we add additional actions if we abstract?

// Server
httpUtil.createServer(function (req, res) {
	var file = urlUtil.parse(req.url).pathname
	var path = pathUtil.join(config.staticPath, file)
	fsUtil.exists(path, function (exists) {
		if ( !exists ) {
			res.statusCode = 404
			return res.end('404 File Not Found')
		}
		fsUtil.stat(path, function (error, stat) {
			if ( error ) {
				console.log('Warning:', error.stack)
				res.statusCode = 404
				return res.end('404 Not Found')
			}

			if ( stat.isDirectory() ) {
				fsUtil.readdir(path, function (error, files) {
					if ( error ) {
						console.log('Warning:', error.stack)
						res.statusCode = 500
						return res.end('500 Internal Server Error')
					}
					return res.end(files.join('\n'))
				})
			}
			else {
				fsUtil.createReadStream(path).pipe(res).on('error', function (error) {
					console.log('Warning:', error.stack)
					res.statusCode = 500
					return res.end('500 Internal Server Error')
				})
			}
		})
	})
}).listen(8000)
