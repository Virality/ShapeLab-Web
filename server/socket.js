var app = Npm.require('http').createServer();
var io = Npm.require('socket.io')(app);

app.listen(80);

io.on('connection', function (socket) {
    socket.emit('news', {hello: 'world'});
    socket.on('my other event', function (data) {
        console.log(data);
    });
});
