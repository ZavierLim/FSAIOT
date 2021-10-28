const router = require("express").Router();
const database = require("../../database");

router.post("/requestaccess", (req, res) => res.send("login"));

module.exports = router;
