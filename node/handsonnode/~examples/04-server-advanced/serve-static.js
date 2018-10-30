'use strict'

// Requires
const fsUtil = require('fs')
const pathUtil = require('path')
const urlUtil = require('url')

// Serve static
module.exports = function (root, req, res, next) {
	const file = urlUtil.parse(req.url).pathname
	const path = pathUtil.join(root, file)
	fsUtil.exists(path, function (exists) {
		if (!exists) {
			if (next) return next()
			res.statusCode = 404
			return res.end('404 File Not Found')
		}
		fsUtil.stat(path, function (error, stat) {
			if (error) {
				console.log('Warning:', error.stack)
				res.statusCode = 500
				return res.end('500 Internal Server Error')
			}

			if (stat.isDirectory()) {
				fsUtil.readdir(path, function (error, files) {
					if (error) {
						console.log('Warning:', error.stack)
						res.statusCode = 500
						return res.end('500 Internal Server Error')
					}
					return res.end(files.join('\n'))
				})
			}
			else {
				const read = fsUtil.createReadStream(path)
				read.on('error', function (error) {
					console.log('Warning:', error.stack)
					res.statusCode = 500
					return res.end('500 Internal Server Error')
				})
				read.pipe(res)
			}
		})
	})
}
