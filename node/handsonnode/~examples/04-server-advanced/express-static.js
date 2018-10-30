'use strict'

// Requires
const express = require('express')
const config = require('./config')

// Application
const app = express()

// Middlewares

// Use our local one
app.use(require('./serve-static').bind(null, config.staticPath))

// Use a custom made one
// app.use(require('serve-static')(config.staticPath))
// app.use(require('serve-index')(config.staticPath))

// Fallback middleware
app.use(function (req, res) {
	res.send(404, '404 Not Found. 🙁 \n')
})


// Server
const server = app.listen(8000)
