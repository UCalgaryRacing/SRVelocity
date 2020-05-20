"use strict";

const express = require("express");
const redisDB = express.Router();
const { writeCSVFromRedis } = require('../../redis/handler')

redisDB.get("/EndRun", (req, res) => {
    writeCSVFromRedis()
});



module.exports = redisDB;