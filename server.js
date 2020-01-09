const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const lusca = require('lusca');
const path = require('path');
require('dotenv').config()
const PORT = 5000;
//Setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname,'client/build')));
app.get('/*', (req, res) => { //Change so it does not serve api requests
    res.sendFile(path.join(__dirname,'client', 'build', 'index.html'));
});


//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
