const express = require("express");
const https = require('https');
const mail = require('./mail.js')
const fs = require('fs')
const app = express();

var cors = require('cors')

const jsonParser = express.json();

const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('localhost.pem', 'utf8');
const passphrase = 'gaurav'; // Replace with your passphrase
const credentials = { key: privateKey, passphrase, cert: certificate };

// Create an HTTPS server with your Express app
const httpsServer = https.createServer(credentials, app);

app.use(cors())

// Define a middleware to redirect HTTP to HTTPS
// function ensureSecure(req, res, next) {
//     if (req.secure) {
//         // Request is already secure (HTTPS)
//         return next();
//     }
//     // Redirect to HTTPS version of the URL
//     res.redirect('https://' + req.hostname + req.originalUrl);
// }

// Use the middleware to enforce HTTPS
// app.use(ensureSecure);

app.post("/api/sendForm", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  res.send(200)
  mail(req.body)
});

app.listen(443, () => console.log(`Example app listening!`));
