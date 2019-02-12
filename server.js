var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();
var stringifyFile;

app.use(bodyParser.json());

app.get('/getNote', function(req, res) {
    fs.readFile('./test.json', 'utf8', function(err, data) {
        if (err) throw err;
        stringifyFile = data;
        res.send(data);
    });
})

app.post('/updateNote/:note', function(req, res) {

    var newStringifyFile = stringifyFile + req.params.note;
    stringifyFile = newStringifyFile;
    
    fs.writeFile('./test.json', stringifyFile, function(err) {
        if (err) throw err;
        console.log('file updated');
    });
    
    res.send('Note updated.');
});

var server = app.listen(3000);
