const express = require("express");
const mail = require('./mail.js')
const app = express();
const port = 3000;
var cors = require('cors')

const jsonParser = express.json();

app.use(cors())

app.post("/api/sendForm", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  res.send(200)
  mail(req.body)
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
