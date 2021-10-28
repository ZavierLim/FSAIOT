const router = require("express").Router();
const database = require("../../database");

router.get("/login", (req, res) => res.send("login"));

router.get("/register", (req, rest) => res.send("register"));

module.exports = router;
