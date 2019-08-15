const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const lusca = require('lusca');
const path = require('path');
require('dotenv').config()
const PORT  = process.env['PORT'];
//Setup
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
