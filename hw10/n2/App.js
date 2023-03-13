http = require('http');
date = require('./date');

http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end("The date and time are currently: " + date.myDate());
}).listen(8080);