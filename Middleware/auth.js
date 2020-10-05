"use strict";

const jwt = require("jsonwebtoken");
const database = require("../Configuration/postgreSQL");
const encrypt = require("./encrypt");

const withAnyAuth = async (req, res, next) => {
  if (req.headers.apikey) {
    req.headers.apikey = encrypt(req.headers.apikey);
    database
      .proc("validateKey", req.headers.apikey)
      .then((data) => {
        req.user = {
          APIKey: req.headers.apikey,
        };
        next();
        return;
      })
      .catch((error) => {
        res.status(401).send({ error: "Not authorized!" }).end();
        return;
      });
  } else {
    const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
    if (!token) return res.status(401).json({ error: "Authentification Error" }).end();
    else {
      var verified = 0;
      await jwt.verify(token, "VerBigSuperScarySecret", (err, decoded) => {
        if (err) res.status(401).json({ error: "Invalid Token" }).end();
        else {
          req.user = decoded.user;
          const payload = {
            user: req.user,
          };
          const newToken = jwt.sign(payload, "VerBigSuperScarySecret", {
            expiresIn: "20m",
          });
          res.cookie("token", newToken, { httpOnly: true });
          next();
        }
      });
    }
  }
};

const withAdminAuth = async (req, res, next) => {
  //Authenticate with JWT
  const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;

  if (!token) return res.status(401).send({ error: "Not authorized!" }).end();
  else {
    await jwt.verify(token, "VerBigSuperScarySecret", (err, decoded) => {
      if (err) res.status(401).send({ error: "Invalid Token" }).end();
      else {
        req.user = decoded.user;
        const payload = {
          user: req.user,
        };
        if (user.isLead) {
          const newToken = jwt.sign(payload, "VerBigSuperScarySecret", {
            expiresIn: "20m",
          });
          res.cookie("token", newToken, { httpOnly: true });
          next();
        } else {
          res.status(401).send({ error: "Invalid Permissions" }).end();
        }
      }
    });
  }
};

module.exports = [withAnyAuth, withAdminAuth];

// const withAnyAuth = async (req, res, next) => {
//   //Authenticate with API Key
//   if (req.headers.apikey) {
//     req.headers.apikey = encrypt(req.headers.apikey);
//     database
//       .proc("validateKey", req.headers.apikey)
//       .then((data) => {
//         req.user = {
//           APIKey: req.headers.apikey,
//         };
//         next();
//         return;
//       })
//       .catch((error) => {
//         res.status(401).send({ error: "Not authorized!" }).end();
//         return;
//       });
//   } else {
//     //Authenticate with JWT
//     const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
//     if (!token) return res.status(401).send({ error: "Authentification Error" }).end();
//     else {
//       var verified = 0;
//       await jwt.verify(token, "AdminSecret", (err, decoded) => {
//         if (err) verified += 1;
//         else {
//           req.user = decoded.user;
//           const payload = {
//             user: req.user,
//           };
//           const newToken = jwt.sign(payload, "AdminSecret", {
//             expiresIn: "20m",
//           });
//           res.cookie("token", newToken, { httpOnly: true });
//           next();
//         }
//       });
//       await jwt.verify(token, "NonAdminSecret", (err, decoded) => {
//         if (err) verified += 1;
//         else {
//           req.user = decoded.user;
//           const payload = {
//             user: req.user,
//           };
//           const newToken = jwt.sign(payload, "NonAdminSecret", {
//             expiresIn: "20m",
//           });
//           res.cookie("token", newToken, { httpOnly: true });
//           next();
//         }
//       });
//       if (verified === 2) res.status(401).send({ error: "Not authorized!" }).end();
//     }
//   }
// };

// const withAdminAuth = async (req, res, next) => {
//   //Authenticate with API Key
//   if (req.headers.apikey) {
//     req.headers.apikey = encrypt(req.headers.apikey);
//     database
//       .proc("validateKey", req.headers.apikey)
//       .then((data) => {
//         req.user = {
//           APIKey: req.headers.apikey,
//         };
//         next();
//         return;
//       })
//       .catch((error) => {
//         res.status(401).send({ error: "Not authorized!" }).end();
//         return;
//       });
//   } else {
//     //Authenticate with JWT
//     const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;

//     if (!token) return res.status(401).send({ error: "Not authorized!" }).end();
//     else {
//       await jwt.verify(token, "AdminSecret", (err, decoded) => {
//         if (err) res.status(401).send({ error: "Not authorized!" }).end();
//         else {
//           req.user = decoded.user;
//           const payload = {
//             user: req.user,
//           };
//           const newToken = jwt.sign(payload, "AdminSecret", {
//             expiresIn: "20m",
//           });
//           res.cookie("token", newToken, { httpOnly: true });
//           next();
//         }
//       });
//     }
//   }
// };
