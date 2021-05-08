'use strict';

const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const socketIOClient = require('socket.io-client');
const api = require('./Utilities/call');
const PORT = 5000;

//Setup
api.setPrefixURL('http://localhost:7000');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// What the fuck
app.use(express.static(path.join(__dirname, 'client/build')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.get('/streaming', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.get('/historical', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.get('/manage', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});
app.get('/licenses', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use(
  session({
    secret: 'xCufvwEyu14Tuu7l',
    resave: true,
    saveUninitialized: true,
    secure: true,
  })
);
app.use(cookieParser());

//Import routes
const dataServer = require('./Router/dataServer');

//Setup routes
app.use('/historical', dataServer);

//Import Routes
const vehicle = require('./Router/vehicle');
const subteam = require('./Router/subteam');
const sensor = require('./Router/sensor');
const teamMember = require('./Router/teamMember');
const driver = require('./Router/driver');
const sessionHandler = require('./Router/session');

//Add Routes
app.use('/vehicle', vehicle);
app.use('/subteam', subteam);
app.use('/sensor', sensor);
app.use('/teamMember', teamMember);
app.use('/driver', driver);
app.use('/session', sessionHandler);

//Python and React socket setup
var io = require('socket.io')(4000);

//Socket to connect to run_data server
const socket = socketIOClient('http://127.0.0.1:5500', {
  //CHANGE WHEN DEPLOYING!
  reconnection: true,
});

// Forward incoming data to React
socket.on('new data', (data) => {
  io.emit(data);
});

//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
