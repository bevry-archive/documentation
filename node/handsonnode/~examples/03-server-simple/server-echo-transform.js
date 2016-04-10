'use strict'

class UC extends require('stream').Transform {
	_transform (data, encoding, next) {
		next(null, data.toString().toUpperCase())
	}
}

class Reverse extends require('stream').Transform {
	_transform (data, encoding, next) {
		next(null, data.toString().split('').reverse().join(''))
	}
}

require('net').createServer(function (socket) {
	socket.write('Talk to me.\n')
	socket.pipe(new UC()).pipe(new Reverse()).pipe(socket)
}).listen(8000)
