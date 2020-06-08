const express = require("express");
const dataServer = express.Router();
const DATASERVERIP = 'http://localhost:4500'
const fetch = require('node-fetch')
//const request = require('request')

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

//Download file
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

//Upload file
dataServer.post("/uploadFile", (req, res) => {
    // fs.readFile(req.files.file.path, (err, data) => {
    //     console.log(data)
    // })
    //req.pipe(DATASERVERIP + '/fileServer/uploadFile')

    console.log(req.body)
    // fetch(DATASERVERIP + '/fileServer/getFile/' + req.params.filename, {
    //     method: 'GET'
    // })
    // .then(response => response.body)
    // .then(response => response.pipe(res))
    // .catch(err => { console.log(err);
    //                 res.sendStatus(500) })
})

//Updates attributes of the file (driver and car)
dataServer.post("/updateMetadata", (req, res) => {
    let meta = {}
    if (req.body.driver) {
        meta['driver'] = req.body.driver
    }
    if (req.body.car) {
        meta['car'] = req.body.car
    }

    let postParams = {
        filename: req.body.filename,
        metadata : meta
    }

    fetch(DATASERVERIP + '/fileServer/updateMetadata', {
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

dataServer.get("/getComments/:id", (req, res) => {
    fetch(DATASERVERIP + '/comments/getComments/' + req.params.id, {
        method: 'GET'
    })
    .then(response => {
        if(response.ok) {
            response.json()
            .then(response => res.send(response))
        } else {
            res.sendStatus(500)
        }})
    .catch(err => {
        console.log(err)
        res.sendStatus(500)
    })
})

dataServer.post("/addComment", (req, res) => {
    let postParams = {
        fileID: req.body.id,
        commenter: req.body.commenter,
        content: req.body.content
    }

    fetch(DATASERVERIP + '/comments/addComment', {
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



module.exports = dataServer;