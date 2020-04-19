const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const lusca = require('lusca');
const path = require('path');
const PORT = 5000;
//Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));
// app.use('/*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });
app.get('/.well-known/pki-validation/20E4F6E45F8A87091A32EACD532408E5.txt', (req, res) => {
    const file = `${__dirname}/20E4F6E45F8A87091A32EACD532408E5.txt`;
    res.download(file);
})
//Python and React socket setup
var io = require('socket.io')(4000);
io.on('connection', function(socket) {
    socket.on('message', function (msg) {
        socket.broadcast.emit('new data', msg);
    });
});

//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
