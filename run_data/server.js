const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const lusca = require('lusca');
const cors = require('cors')
const path = require('path');
const PORT = 4500;

//Setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

app.get("/api", (req, res) => {
    res.json({ message: "API Working" });
});

//Import routes
const redisDB = require('./routes/redis/redisRoutes')

//Setup routes
app.use("/redis", redisDB);

//Creating server for getting new data
const socketServer = require('./socketServer')

//Begin
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));