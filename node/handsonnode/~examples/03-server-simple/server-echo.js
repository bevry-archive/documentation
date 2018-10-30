'use strict'

const net = require('net')
net.createServer(function (socket) {
	socket.write('Talk to me.\n')
	socket.on('data', function (data) {
		socket.write(data.toString().toUpperCase())
	})
}).listen(8000)
