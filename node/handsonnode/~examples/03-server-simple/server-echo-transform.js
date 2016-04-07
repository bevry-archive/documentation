class UC extends require('streams').Transform {
	_transform (data, encoding, next) {
		next(null, data.toString().toUpperCase()
	}
}

require('net').createServer(function (socket) {
	socket.write('Talk to me.\n')
	socket.pipe(new UC()).pipe(socket)
}).listen(8000)
