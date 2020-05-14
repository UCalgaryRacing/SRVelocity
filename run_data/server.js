const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const lusca = require('lusca');
const cors = require('cors')
const path = require('path');
const PORT = 6000;
const { add_data } = require('./redis/handler')

//Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get("/api", (req, res) => {
    res.json({ message: "API Working" });
});

//Import routes
const pgDatabase = require("./Router/pgDatabase");

//Setup routes
app.use("/api/pgdb", pgDatabase);


//Creating server for getting new data
var io = require('socket.io')(5000);
io.on('connection', function (socket) {
    socket.on('message', function (msg) {
        socket.broadcast.emit('new data', msg);
    });
});

//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));