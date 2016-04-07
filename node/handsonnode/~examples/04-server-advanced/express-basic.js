// Requires
var express = require('express')

// Application
var app = express()

// Routes
// These make things easier
app.get('/', function (req, res) {
  res.send('hello world')
})

// Fallback middleware
app.use(function (req, res) {
	res.send(404, '404 Not Found. 🙁 \n')
	// ^ this is different from connect
})

// Server
var server = app.listen(8000)
