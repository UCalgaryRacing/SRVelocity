const express = require("express");
const dataServer = express.Router();
const DATASERVERIP = 'http://localhost:4500';
const fetch = require('node-fetch');
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const FormData = require('form-data')

dataServer.get("/getFiles", (req, res) => {
    fetch(DATASERVERIP + '/fileServer/getFiles', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(response => res.send(response))
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
});

//Download file
dataServer.get("/getFile/:filename", (req, res) => {
    fetch(DATASERVERIP + '/fileServer/getFile/' + req.params.filename, {
        method: 'GET'
    })
        .then(response => response.body)
        .then(response => response.pipe(res))
        .catch(err => {
            console.log(err);
            res.sendStatus(500)
        })
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
            if (response.ok) res.sendStatus(200)
            else res.sendStatus(500)
        })
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
            if (response.ok) {
                res.sendStatus(200)
            } else {
                res.sendStatus(500)
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

//Upload file
dataServer.post("/uploadFile/", upload.any(), (req, res) => {

    // Theres only one file but still need to iterate
    req.files.forEach(file => {
        var form = new FormData()
        form.append('data', file.buffer, file.originalname)
        fetch(DATASERVERIP + '/fileServer/uploadFile/', {
            method: 'POST',
            body: form
        })
        .then(response => response.json())
            .then(response => {
                //if (response.ok) {
                console.log(response)
                res.send({ ID: response.ID })
                // } else {
                //     res.sendStatus(500)
                // }
            })
            .catch(err => {
                console.log(err)
                res.sendStatus(500)
            })

    })

})

//Updates attributes of the file (driver and car)
dataServer.post("/updateMetadata", (req, res) => {
    console.log(req.body)
    let meta = {}
    if (req.body.driver) meta['driver'] = req.body.driver
    if (req.body.car) meta['car'] = req.body.car

    let postParams = {
        filename: req.body.filename,
        metadata: meta
    }

    fetch(DATASERVERIP + '/fileServer/updateMetadata', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postParams)
    })
        .then(async response => {
            if (response.ok) {
                res.sendStatus(200);
            }
            else res.sendStatus(500)
        })
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
            if (response.ok) {
                response.json()
                    .then(response => res.send(response))
            } else {
                res.sendStatus(500)
            }
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

dataServer.post("/addComment", (req, res) => {
    let postParams = {
        fileID: req.body.fileID,
        content: req.body.content,
        commenter: req.body.commenter,
        commenterID: req.body.commenterID
    }

    fetch(DATASERVERIP + '/comments/addComment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postParams)
    })
        .then(response => response.json())
        .then(response => {
            res.send(response)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

dataServer.delete("/deleteComment", (req, res) => {
    let postParams = {
        fileID: req.body.fileID,
        commentID: req.body.commentID
    }

    fetch(DATASERVERIP + '/comments/deleteComment', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postParams)
    })
        .then(response => {
            if (response.ok) res.sendStatus(200);
            else res.sendStatus(500)
        })
        .catch(err => {
            console.log(err)
            res.sendStatus(500)
        })
})

module.exports = dataServer;