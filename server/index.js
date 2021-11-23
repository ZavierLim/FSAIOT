const express = require("express");
const app = express();
const port = 3000;
//Loads the handlebars module
const { engine } = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded());

//for / -> go to routes files
app.use("/", require("../router/index"));
// app.use("/", require("../router/index"));
// app.use("/users", require("../router/users"));
// app.use("/contractors", require("../router/contractors"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;
