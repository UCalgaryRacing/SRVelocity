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
    let postParams = {
        oldFilename: req.body.oldFilename,
        newFilename: req.body.newFilename
    }

    fetch(DATASERVERIP + '/fileServer/renameFile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postParams)
    })
    .then(response => {
        if(response.ok) res.sendStatus(200)
        else res.sendStatus(500)})
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

// Deletes file in storage. MUST contain full filename (including the file extension. e.g. '.csv').
dataServer.get("/deleteFile/:filename", (req, res) => {
    fetch(DATASERVERIP + '/fileServer/deleteFile/' + req.params.filename, {
        method: 'GET'
    })
    .then(response => {
        if(response.ok) {
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }})
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

module.exports = dataServer;