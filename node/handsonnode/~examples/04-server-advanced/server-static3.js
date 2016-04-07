// Requires
var httpUtil = require('http');
var fsUtil = require('fs');
var urlUtil = require('url');

// Configuration
var appConfig = {
	staticPath:  __dirname // __dirname+'/static'
};

// Handlers
// Next will fire if we did not find a file for that url
// next(err)
var handleFiles = function(req,res,next){
	// Prepare
	var url = urlUtil.parse(req.url);
	var path = appConfig.staticPath+url.pathname;  // definitely not secure

	// Check if path exists
	fsUtil.exists(path,function(exists){
		// If it does, read that file
		if ( exists ) {
			fsUtil.readFile(path,function(err,data){
				if (err)  return next(err);
				res.end(data)
			});
		}
		// Otherwise continue down the flow
		else {
			next(null);
		}
	});
};

// Server
httpUtil.createServer(function(req,res){
	handleFiles(req,res,function(err){
		if (err)  throw err;
		res.statusCode = 404;
		res.end('404 Not Found. Sorry.\n');
	});
}).listen(8000, '127.0.0.1');