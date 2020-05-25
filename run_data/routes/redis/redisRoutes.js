const express = require("express");
const redisDB = express.Router();
const { writeCSVFromRedis } = require('../../redis/handler')

redisDB.get("/EndRun/:CSVname", (req, res) => {
    writeCSVFromRedis(req.params.CSVname)
    res.sendStatus(200)
});

module.exports = redisDB;