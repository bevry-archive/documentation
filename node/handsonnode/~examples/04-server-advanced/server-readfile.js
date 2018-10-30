'use strict'

// Requires
const httpUtil = require('http')
const fsUtil = require('fs')
const pathUtil = require('path')
const urlUtil = require('url')
const config = require('./config')

// Server
httpUtil.createServer(function (req, res) {
	const file = urlUtil.parse(req.url).pathname
	const path = pathUtil.join(config.staticPath, file)
	fsUtil.exists(path, function (exists) {
		if (!exists) {
			res.statusCode = 404
			return res.end('404 File Not Found')
		}
		fsUtil.readFile(path, function (error, data) {
			if (error) {
				console.log('Warning:', error.stack)
				res.statusCode = 500
				return res.end('500 Internal Server Error')
			}
			return res.end(data)
		})
	})
}).listen(8000)
