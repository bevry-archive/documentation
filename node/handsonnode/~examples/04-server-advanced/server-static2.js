// Requires
var httpUtil = require('http')
var fsUtil = require('fs')
var pathUtil = require('path')
var config = require('./config')

// Serve the file system over a server
function serveFileSystem (req, res) {
	var query = require('querystring').parse(require('url').parse(url).query)
	// /?action=read&file=static-server.js
	if ( query.action === 'read' ) {
		var path = pathUtil.join(config.staticPath, query.file || '')  // not secure
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
	}
	else {
		res.statusCode = 400
		return res.end('400 Bad Request')
	}
}

// Server
httpUtil.createServer(function (req, res) {
	serveFileSystem(req, res)
}).listen(8000)
