var express = require('express'),
    path = require('path'),
    http = require('http'),
    item = require('./routes/itemsAPI');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'static')));
});

app.get('/items', item.findAll);
app.get('/items/:id', item.findById);
app.post('/items', item.addItem);
app.put('/items/:id', item.updateItem);
app.delete('/items/:id', item.deleteItem);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
