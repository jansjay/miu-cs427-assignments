const express = require('express');
const fs = require('fs');
const url = require('url');
const config = require('./config');
const wordUtil = require("./lib/word")(config.dbHost, config.dbUser, config.dbPassword, config.dbName);
const port = 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static('static'));
app.get("/", function(req, res){
    fs.readFile("dict.html", function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data, "UTF-8");
        return res.end();        
    });   
});

app.get("/get-word", async function(req, res){
    var q = url.parse(req.url, true);
    if(!q.query.word){
        res.writeHead(400, {'Content-Type': 'text/html'});
        return res.end("{\"error\": \"Term is missing\"}");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    wordUtil.getWordInfo(q.query.word, function(data){
        res.write(JSON.stringify(data), 'utf-8');
        return res.end();
    })    
});

app.listen(port, function () {
    console.log(`Project app listening on port ${port}!`);
});