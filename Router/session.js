'use strict';

const express = require('express');
const sessionServer = express.Router();
const DATASERVERIP = 'http://localhost:4500';
const fetch = require('node-fetch');

// What happens when the server responds with a 500

sessionServer.get('/getSessions', (req, res) => {
  fetch(DATASERVERIP + '/session/getSessions', {
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

sessionServer.get('/getSession/:sessionId', (req, res) => {
  fetch(DATASERVERIP + '/session/getSession/' + req.params.sessionId, {
    method: 'GET',
  })
    .then(async (response) => {
      const result = await response.json();
      if (response.ok) {
        res.send(result).end();
      } else {
        res.status(400).send(result.message);
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500).end();
    });
});

sessionServer.post('/createSession', (req, res) => {
  fetch(DATASERVERIP + '/session/createSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then((response) => response.json())
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

sessionServer.post('/deleteSession', (req, res) => {
  fetch(DATASERVERIP + '/session/deleteSession', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionId: req.body.sessionId }),
  })
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

sessionServer.post('/updateSessionMetadata', (req, res) => {
  fetch(DATASERVERIP + '/session/updateSessionMetadata', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then(async (response) => {
      if (response.ok) {
        res.sendStatus(200);
      } else {
        const result = await response.json();
        res.status(response.status).send(result.message || '');
      }
    })
    .catch((err) => {
      res.sendStatus(500).end();
    });
});

sessionServer.post('/addRun', (req, res) => {
  fetch(DATASERVERIP + '/session/addRun', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then(async (response) => {
      if (response.ok) {
        res.sendStatus(200);
      } else {
        const result = await response.json();
        res.status(response.status).send(result.message || '');
      }
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500).end();
    });
});

sessionServer.post('/removeRun', (req, res) => {
  fetch(DATASERVERIP + '/session/removeRun', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then((response) => {
      res.sendStatus(response.status);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500).end();
    });
});

/* For adding comments to session */
sessionServer.post('/addComment', (req, res) => {});

/* For removing comments from session */
sessionServer.post('/removeComment', (req, res) => {});

module.exports = sessionServer;
