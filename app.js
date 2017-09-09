var express = require('express');
var app = express();

app.get('/index', function(req, res){
    res.send('hello world');
});

app.listen(3000);