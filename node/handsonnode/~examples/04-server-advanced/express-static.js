// Requires
var express = require('express')
var config = require('./config')

// Application
var app = express()

// Middlewares
app.use(express.static(config.staticPath))
app.use(function (req, res, next) {
	res.send(404, '404 Not Found. Sorry.\n')
})

// Server
var server = app.listen(8000)
