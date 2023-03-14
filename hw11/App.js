const express = require("express");
const fs = require('fs');
const app = express();
const port = 8080;

function readAndReplaceIndexHtml(res, numberOne, numberTwo, result, operator) {
    fs.readFile("index.html", function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            return res.end("404 Not Found");
        }
        
        data = data.toString().replace(/\{\{numberOne\}\}/, numberOne);        
        data = data.toString().replace(/\{\{numberTwo\}\}/, numberTwo);
        data = data.toString().replace(/\{\{result\}\}/, result);
        switch (operator) {
            case "add" : data = data.toString().replace(/\{\{add\}\}/, "selected"); break;
            case "divide" : data = data.toString().replace(/\{\{divide\}\}/, "selected"); break;
            case "multiply" : data = data.toString().replace(/\{\{multiply\}\}/, "selected"); break;
            case "subtract" : data = data.toString().replace(/\{\{subtract\}\}/, "selected"); break;
            default: break;
        }
        data = data.toString().replace(/\{\{add\}\}/, "");
        data = data.toString().replace(/\{\{divide\}\}/, "");
        data = data.toString().replace(/\{\{multiply\}\}/, "");
        data = data.toString().replace(/\{\{subtract\}\}/, "");
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(data, "UTF-8");
        return res.end();        
    });
}

app.use('/css', express.static('css'));
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    return readAndReplaceIndexHtml(res, "", "", "", "add");
});

app.post("/", function(req, res){
    const numberOne = parseFloat(req.body["number-one"]);
    const numberTwo = parseFloat(req.body["number-two"]);
    const operator = req.body["operator"];
    let result = 0;

    if(isNaN(numberOne) || isNaN(numberTwo) || !operator){
        res.writeHead(400, {'Content-Type': 'text/html'});
        return res.end("400 Invalid Parameters");
    }

    switch (operator) {
        case "add" : result = numberOne + numberTwo; break;
        case "divide" : {
            if(numberTwo == 0) {
                res.writeHead(400, {'Content-Type': 'text/html'});
                return res.end("400 Division by Zero");
            }
            result = numberOne / numberTwo; break;
        }
        case "multiply" : result = numberOne * numberTwo; break;
        case "subtract" : result = numberOne - numberTwo; break;
        default: {
            res.writeHead(400, {'Content-Type': 'text/html'});
            return res.end("400 Invalid Operator");
        }
    }
    // Due to returning to same page and no side affects, post sends data back
    return readAndReplaceIndexHtml(res, numberOne, numberTwo, result, operator);
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});