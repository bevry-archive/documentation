'use strict'

// Requires
const express = require('express')

// Application
const app = express()

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
const server = app.listen(8000)
