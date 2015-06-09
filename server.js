var express = require('express'),
    path = require('path'),
    http = require('http'),
    item = require('./routes/items');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.configure(function () {
    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev'));  /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser()),
    app.use(express.static(path.join(__dirname, 'public')));
});

app.get('/wines', item.findAll);
app.get('/wines/:id', item.findById);
app.post('/wines', item.addItem);
app.put('/wines/:id', item.updateItem);
app.delete('/wines/:id', item.deleteItem);

server.listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});
