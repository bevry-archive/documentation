// Requires
var connect = require('connect')
var config = require('./config')

// Server
var app = connect()
	.use(connect.static(config.staticPath))
	.use(function (req, res, next) {
		res.statusCode = 404
		res.end('404 Not Found. Sorry.\n')
	})
	.listen(8000)
