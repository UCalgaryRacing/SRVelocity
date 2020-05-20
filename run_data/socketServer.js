var io = require('socket.io')(5000);
const { addData } = require('./redis/handler')

io.on('connection', function (socket) {
    socket.on('message', function (msg) {
        socket.broadcast.emit('new data', msg);
        addData(msg)
    });
});
