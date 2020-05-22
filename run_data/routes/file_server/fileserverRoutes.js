const express = require("express");
const fileServer = express.Router();
const { viewFiles, downloadFile } = require('../../file_server/fileServerHandler')

fileServer.get("/getFilenames", (req, res) => {
    viewFiles(res)
});

fileServer.get("/getFile/:filename", (req, res) => {
    downloadFile(res, req.params.filename)
})

module.exports = fileServer;