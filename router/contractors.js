const router = require("express").Router();
const database = require("../database");

router.get("/all", async (req, res) => {
  let sql = "SELECT * FROM contractors";

  //destructure row packet data and resultsethea.der
  const [tolog, _] = await database.execute(sql);
  console.log(tolog);

  res.send(tolog);
});

module.exports = router;
