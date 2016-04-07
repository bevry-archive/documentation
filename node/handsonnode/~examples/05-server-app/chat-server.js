// Requires
var express = require('express')
var primus = require('primus')
var pathUtil = require('path')

// Application
var app = require('express')()
var server = require('http').createServer(app)
var primus = new require('primus')(server, { transformer: 'websockets' })

// Middlewares
app.get('/', function (req, res) {
	require('fs').createReadStream(pathUtil.join(__dirname, 'chat-client.html')).pipe(res)
})
app.use(function (req, res) {
	res.status(404).send('404 Not Found. 🙁 \n')
})

// Socket
primus.on('connection', function (spark) {
	console.log('connection has the following headers', spark.headers);
	console.log('connection was made from', spark.address);
	console.log('connection id', spark.id);

	// Receive messages
	spark.on('data', function (message) {
		// Broadcast them back to everyone
		primus.write('user ' + spark.id + ' sends ' + message.toString())
	})

	// Send an initial hello
	spark.write('Hello user ' + spark.id + '. I am the server communicating to you.')
})

// Listen
server.listen(8000)
