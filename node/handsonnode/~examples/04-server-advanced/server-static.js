'use strict'

// Requires
const httpUtil = require('http')
const fsUtil = require('fs')
const pathUtil = require('path')
const urlUtil = require('url')
const config = require('./config')

// @TODO
// This is getting a bit big, how can we refactor this?
// Can we abstract it out?
// What considerations do we need to take into account?
// How would we add additional actions if we abstract?

// Server
httpUtil.createServer(function (req, res) {
	const file = urlUtil.parse(req.url).pathname
	const path = pathUtil.join(config.staticPath, file)
	fsUtil.exists(path, function (exists) {
		if (!exists) {
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
}).listen(8000)
