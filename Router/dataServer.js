const express = require("express");
const dataServer = express.Router();
const DATASERVERIP = 'http://localhost:4500'
const fetch = require('node-fetch')

dataServer.get("/getFiles", (req, res) => {
    fetch(DATASERVERIP + '/fileServer/getFiles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => res.send(response))
    .catch(err => { console.log(err);
                    res.sendStatus(500) })
});

dataServer.get("/getFile/:filename", (req, res) => {
    fetch(DATASERVERIP + '/fileServer/getFile/' + req.params.filename, {
        method: 'GET'
    })
    .then(response => response.body)
    .then(response => response.pipe(res))
    .catch(err => { console.log(err);
                    res.sendStatus(500) })
})

dataServer.post("/renameFile", (req, res) => {
    fetch(DATASERVERIP + '/fileServer/getFile/', {
        method: 'POST',
        body: req.body
    })
    .then(response => res.sendStatus(200))
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

// Deletes file in storage. MUST contain full filename (including the file extension. e.g. '.csv').
dataServer.get("/deleteFile/:filename", (req, res) => {
    deleteFile(res, req.params.filename)
})

module.exports = dataServer;