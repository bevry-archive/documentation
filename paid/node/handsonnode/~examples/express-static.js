// Requires
var express = require('express');

// Configuration
var appConfig = {
	staticPath:  __dirname // __dirname+'/static'
};

// Application
var app = express();

// Middlewares
app.use(express.static(appConfig.staticPath));
app.use(function(req,res,next){
	res.send(404, '404 Not Found. Sorry.\n');
});

// Server
var server = app.listen(8000);