// Requires
var fsUtil = require('fs')
var pathUtil = require('path')
var urlUtil = require('url')

// Serve static
module.exports = function (root, req, res, next) {
	var file = urlUtil.parse(req.url).pathname
	var path = pathUtil.join(root, file)
	fsUtil.exists(path, function (exists) {
		if ( !exists ) {
			if ( next )  return next()
			res.statusCode = 404
			return res.end('404 File Not Found')
		}
		fsUtil.stat(path, function (error, stat) {
			if ( error ) {
				console.log('Warning:', error.stack)
				res.statusCode = 500
				return res.end('500 Internal Server Error')
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
}
