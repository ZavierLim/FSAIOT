const router = require("express").Router();
const database = require("../database");

router.get("/", async (req, res) => {
  await res.send("main page");
});

module.exports = router;
