"use strict";

const express = require("express");
const pgDatabase = express.Router();
const http = require("http");

pgDatabase.get("/getSensors", (req, res) => {
  try {
    let options = {
      host: "127.0.0.1",
      port: 7000,
      path: "/sensor/getSensors/14",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        apikey: "VQ2SBXW-1N14EQ7-PWX5JBZ-C5S45FA",
      },
    };
    http.get(options, (newRes) => {
      if (newRes.statusCode !== 200) {
        res.status(404).end();
        return;
      }
      newRes
        .on("data", (data) => {
          try {
            res.status(200).json(JSON.parse(data)).end();
          } catch (err) {
            res.status(500).end();
          }
        })
        .on("error", (error) => {
          res.status(500).send("Error getting sensors!").end();
        });
    });
  } catch (err) {
    res.status(500).send(err).end();
  }
});

pgDatabase.get("/get", (req, res) => {
  try {
    let args = req.body;
    let options = {
      host: "localhost",
      port: 7000,
      path: req.body.path,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": args.length,
      },
    };
    http.get(options, (newRes) => {
      if (newRes.statusCode !== 200) {
        res.status(404).end();
        return;
      }
      newRes
        .on("data", (data) => {
          try {
            res.json(JSON.parse(data));
          } catch (err) {
            res.status(500).end();
          }
        })
        .on("error", (error) => {
          res.status(500).end();
        });
    });
  } catch (err) {
    res.status(500).end();
  }
});

pgDatabase.post("/post", (req, res) => {});

pgDatabase.put("/put", (req, res) => {});

pgDatabase.delete("/delete", (req, res) => {});

module.exports = pgDatabase;
