const router = require("express").Router();
const database = require("../database");
const app = require("../server");

router.get("/", async (req, res) => {
  await res.send("main page");
});

router.use("/users", require("./apis/users"));
router.use("/request", require("./apis/request"));
router.use("/AccessHistory", require("./apis/AccessHistory"));
router.use("/contractors", require("./apis/contractors"));
router.use("/clicksend", require("./apis/clicksend"));

module.exports = router;
