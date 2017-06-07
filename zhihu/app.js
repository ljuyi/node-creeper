var express = require('express');
var app = express();
var getPeople = require('./static/zhihu-creeper');

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})
app.get('/userinfo', function(req, res) {
    getPeople('people', req.query['q'], function(data) {
        res.send(data);
    });
    
})
app.get('/followers', function(req, res) {
    getFollowers()
})
app.use(express.static('static'))

app.listen(3000, function() {
    console.log('服务器启动成功');
})