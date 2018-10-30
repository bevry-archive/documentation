'use strict'

const http = require('http')
let count = 0
http.createServer(function (req, res) {
	console.log('Received', ++count, 'requests so far')
	res.writeHead(200, { 'Content-Type': 'text/plain' })
	res.end('hello world\n')
}).listen(8000)
