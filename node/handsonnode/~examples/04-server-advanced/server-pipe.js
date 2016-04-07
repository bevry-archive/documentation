// Requires
var httpUtil = require('http')
var fsUtil = require('fs')
var pathUtil = require('path')
var config = require('./config')

// Server
httpUtil.createServer(function (req, res) {
	var query = require('querystring').parse(require('url').parse(url).query)
	// /?action=read&file=static-server.js
	if ( query.action === 'read' ) {
		var path = pathUtil.join(config.staticPath, query.file || '')  // not secure
		fsUtil.createReadStream(path).pipe(res).on('error', function (error) {
			console.log('Warning:', error.stack)
			res.statusCode = 500
			return res.end('500 Internal Server Error')
		})
	}
	else {
		res.statusCode = 405
		return res.end('405 Method Not Allowed')
	}
}).listen(8000)
