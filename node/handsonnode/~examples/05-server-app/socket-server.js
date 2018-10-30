'use strict'

// Requires
const express = require('express')
const Primus = require('primus')
const pathUtil = require('path')

// Application
const app = require('express')()
const server = require('http').createServer(app)
const primus = new Primus(server, { transformer: 'websockets' })

// Middlewares
app.get('/', function (req, res) {
	require('fs').createReadStream(pathUtil.join(__dirname, 'socket-client.html')).pipe(res)
})
app.use(function (req, res) {
	res.status(404).send('404 Not Found. 🙁 \n')
})

// Socket
primus.on('connection', function (spark) {
	console.log('connection has the following headers', spark.headers)
	console.log('connection was made from', spark.address)
	console.log('connection id', spark.id)

	// Receive messages
	spark.on('data', function (message) {
		console.log('connection', spark.id, 'sends', message.toString())
	})

	// Send messages
	process.stdin.on('data', function (message) {
		spark.write('The server has spoken: ' + message.toString())
	})

	// Send an initial hello
	spark.write('Hello user. I am the server communicating to you.')
})

// Listen
server.listen(8000)
