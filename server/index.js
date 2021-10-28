const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

//for / -> go to routes files
app.use("/", require("../router/index"));
app.use("/users", require("../router/users"));
app.use("/contractors", require("../router/contractors"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
