const express = require("express");
const fileServer = express.Router();
const { viewFiles, downloadFile, renameFile, deleteFile } = require('../../file_server/fileServerHandler')

fileServer.get("/getFiles", (req, res) => {
    viewFiles(res)
});

fileServer.get("/getFile/:filename", (req, res) => {
    console.log(req.params.filename)
    downloadFile(res, req.params.filename)
})

// Renames file already in storage. MUST contain full filename (including the file extension. e.g. '.csv').
fileServer.post("/renameFile", (req, res) => {
    renameFile(res, req.body.oldFilename, req.body.newFilename)
})

// Deletes file in storage. MUST contain full filename (including the file extension. e.g. '.csv').
fileServer.get("/deleteFile/:filename", (req, res) => {
    deleteFile(res, req.params.filename)
})

module.exports = fileServer;