const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const lusca = require('lusca');
const cors = require('cors')
const path = require('path');
const socketIOClient = require('socket.io-client')
const PORT = 5000;

//Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));
app.get("/", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/streaming", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/historical", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/manage", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/about", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/signin", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });
app.get("/licenses", (req, res) => { res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); });

app.use(session({
    secret: "xCufvwEyu14Tuu7l",
    resave: true,
    saveUninitialized: true,
    secure: true
}));
app.use(cookieParser());

app.get("/api", (req, res) => {
    res.json({ message: "API Working" });
});

//Import routes
const pgDatabase = require("./Router/pgDatabase");
const dataServer = require("./Router/dataServer");

//Setup routes
app.use("/api/pgdb", pgDatabase);
app.use("/historical", dataServer);


//Python and React socket setup
var io = require('socket.io')(4000);

//Socket to connect to run_data server


const socket = socketIOClient('http://127.0.0.1:5500', { //CHANGE WHEN DEPLOYING!
    'reconnection' : true
    });
     
    socket.on('new data', (data) => {
            io.emit(data)
    });

//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));