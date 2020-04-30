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
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/streaming", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/historical", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/manage", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/about", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/signin", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/licenses", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });

//Import routes
const pgDatabase = require("./Router/pgDatabase");

//Setup routes
app.use("/api/pgdb", pgDatabase);

//Python and React socket setup
var io = require('socket.io')(4000);
io.on('connection', function (socket) {
    socket.on('message', function (msg) {
        socket.broadcast.emit('new data', msg);
    });
});

//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));