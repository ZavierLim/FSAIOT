const express = require("express");
const app = express();
const port = 3000;
const database = require("../database");

app.use(express.json());

app.use(require("../router"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
