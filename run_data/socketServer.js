const { addData } = require('./redis/handler')

var io = require('socket.io')(4000);

io.on('connection', function (socket) {
    console.log('Client connected')
    socket.on('message', function (msg) {
        socket.broadcast.emit('new data', msg);
        addData(msg)
    });
});

