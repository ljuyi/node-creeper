var express = require('express');
var app = express();
var creeper = require('./static/zhihu-creeper');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get('/userinfo', function(req, res) {
    creeper('people', req.query['q'], function(data) {
        res.send(data);
    });
    
})
app.use(express.static('static'))

app.listen(3000, function() {
    console.log('服务器启动成功');
})