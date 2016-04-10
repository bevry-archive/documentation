// Application
var net = require('net')
var sockets = []
net.createServer(function (socket) {
    sockets.push(socket)
    socket.write('Talk to me.\n')

	socket.on('data', function (data) {
        for ( var i = 0; i < sockets.length; ++i ) {
            sockets[i].write(data)
        }
	})

	socket.on('end', function () {
        var index = sockets.indexOf(socket)
		sockets = sockets.slice(0, index).concat(sockets.slice(index + 1))
	})
}).listen(8000)
