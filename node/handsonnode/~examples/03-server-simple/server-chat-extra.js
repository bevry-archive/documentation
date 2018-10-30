'use strict'

// Application
const net = require('net')
let count = 0
const sockets = {}
function broadcast (message) {
	for (const key in sockets) {
		if (sockets.hasOwnProperty(key)) {
			sockets[key].write(message)
		}
	}
}
net.createServer(function (socket) {
	sockets[socket.index = count++] = socket
	socket.write('Hello user ' + socket.index + '\n')
	broadcast('User ' + socket.index + ' joined\n')

	socket.on('data', function (data) {
		broadcast('User ' + socket.index + ' says: ' + data.toString())
	})

	socket.on('end', function () {
		delete sockets[socket.index]
		broadcast('User ' + socket.index + ' left\n')
	})
}).listen(8000)
