'use strict';

const express = require('express');
const dataServer = express.Router();
const DATASERVERIP = 'http://localhost:4500';
const fetch = require('node-fetch');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const FormData = require('form-data');

dataServer.get('/getFiles', (req, res) => {
  fetch(DATASERVERIP + '/fileServer/getFiles', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((response) => res.send(response).end())
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

//Download file
dataServer.get('/getFile/:fileId', (req, res) => {
  fetch(DATASERVERIP + '/fileServer/getFile/' + req.params.fileId, {
    method: 'GET',
  })
    .then((response) => response.body)
    .then((response) => response.pipe(res))
    .catch((err) => {
      res.sendStatus(500);
    });
});

dataServer.post('/renameFile', (req, res) => {
  let postParams = {
    id: req.body.id,
    metadata: { name: req.body.newFilename },
  };

  fetch(DATASERVERIP + '/fileServer/updateMetadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postParams),
  })
    .then((response) => {
      if (response.ok) res.sendStatus(200);
      else res.sendStatus(500);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

// Deletes file in storage. MUST contain full filename (including the file extension. e.g. '.csv').
dataServer.get('/deleteFile/:fileId', (req, res) => {
  fetch(DATASERVERIP + '/fileServer/deleteFile/' + req.params.fileId, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) res.sendStatus(200).end();
      else res.sendStatus(500).end();
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

//Upload file
dataServer.post('/uploadFile/', upload.any(), (req, res) => {
  // Theres only one file but still need to iterate
  req.files.forEach((file) => {
    var form = new FormData();
    form.append('data', file.buffer, file.originalname);
    fetch(DATASERVERIP + '/fileServer/uploadFile/', {
      method: 'POST',
      body: form,
    })
      .then((response) => response.json())
      .then((response) => {
        res.json({ ID: response.ID }).end();
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500).end();
      });
  });
});

//Updates attributes of the file (driver and car)
dataServer.post('/updateMetadata', (req, res) => {
  let meta = {};
  if (req.body.driver) meta['driver'] = req.body.driver;
  if (req.body.car) meta['car'] = req.body.car;
  if (req.body.filename) meta['name'] = req.body.filename;

  let postParams = {
    id: req.body.id,
    metadata: meta,
  };

  fetch(DATASERVERIP + '/fileServer/updateMetadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postParams),
  })
    .then(async (response) => {
      res.sendStatus(200).end();
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

dataServer.get('/getComments/:id', (req, res) => {
  fetch(DATASERVERIP + '/comments/getComments/' + req.params.id, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((response) => res.send(response).end());
      } else res.sendStatus(500).end();
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

dataServer.post('/addComment', (req, res) => {
  let postParams = {
    fileID: req.body.fileID,
    content: req.body.content,
    commenter: req.body.commenter,
    commenterID: req.body.commenterID,
  };

  fetch(DATASERVERIP + '/comments/addComment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postParams),
  })
    .then((response) => response.json())
    .then((response) => {
      res.send(response).end();
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

dataServer.delete('/deleteComment', (req, res) => {
  let postParams = {
    fileID: req.body.fileID,
    commentID: req.body.commentID,
  };

  fetch(DATASERVERIP + '/comments/deleteComment', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postParams),
  })
    .then((response) => {
      if (response.ok) res.sendStatus(200).end();
      else res.sendStatus(500).end();
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

dataServer.get('/getColumn/:filename/:column', (req, res) => {
  fetch(
    DATASERVERIP +
      '/redis/getColumn/' +
      req.params.filename +
      '/' +
      req.params.column,
    {
      method: 'GET',
    }
  )
    .then((response) => {
      if (response.ok) {
        response.json().then((response) => res.send(response).end());
      } else res.sendStatus(500).end();
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

dataServer.get('/getHeader/:filename', (req, res) => {
  fetch(DATASERVERIP + '/redis/getHeader/' + req.params.filename, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((response) => res.send(response).end());
      } else res.sendStatus(500).end();
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

module.exports = dataServer;
